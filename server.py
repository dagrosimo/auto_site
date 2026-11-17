"""Backend server for KORO Auto Chemistry Poland storefront + Telegram lead routing."""

from __future__ import annotations

import html
import json
import logging
import os
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Literal

import aiofiles
from aiohttp import ClientSession, ClientTimeout, web
from pydantic import BaseModel, Field, ValidationError, field_validator

BASE_DIR = Path(__file__).resolve().parent
PUBLIC_DIR = BASE_DIR / "public"
DATA_DIR = BASE_DIR / "data"
LEADS_FILE = DATA_DIR / "leads.jsonl"
CHAT_ID_FILE = DATA_DIR / "telegram_chat_id.txt"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
logger = logging.getLogger("koro-server")


def load_dotenv(env_path: Path) -> None:
    """Load simple KEY=VALUE pairs from .env into os.environ if unset."""
    if not env_path.exists():
        return
    for raw_line in env_path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        key = key.strip()
        value = value.strip().strip('"').strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


load_dotenv(BASE_DIR / ".env")


class LeadItem(BaseModel):
    sku: str = Field(min_length=1, max_length=40)
    name: str = Field(min_length=1, max_length=120)
    volume: str = Field(min_length=1, max_length=32)
    qty: int = Field(ge=1, le=999)
    unit_price_pln: float = Field(ge=0, le=100000)


class LeadRequest(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    contact: str = Field(min_length=3, max_length=80)
    contact_channel: Literal["phone", "telegram", "whatsapp", "email"] = "phone"
    customer_type: Literal["private", "b2b"] = "private"
    city: str = Field(default="", max_length=80)
    nip: str = Field(default="", max_length=32)
    car_or_business: str = Field(default="", max_length=120)
    notes: str = Field(default="", max_length=1000)
    items: list[LeadItem] = Field(default_factory=list, max_length=30)
    lang: Literal["pl", "ru", "en"] = "pl"

    @field_validator("name", "contact", "city", "nip", "car_or_business", "notes", mode="before")
    @classmethod
    def strip_strings(cls, value: object) -> str:
        return str(value or "").strip()


class RateLimiter:
    """Simple sliding-window rate limiter per client IP."""

    def __init__(self, max_requests: int = 12, window_seconds: int = 60) -> None:
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._hits: dict[str, list[float]] = {}

    def allow(self, client_ip: str) -> bool:
        now = time.monotonic()
        cutoff = now - self.window_seconds
        recent = [ts for ts in self._hits.get(client_ip, []) if ts > cutoff]
        if len(recent) >= self.max_requests:
            self._hits[client_ip] = recent
            return False
        recent.append(now)
        self._hits[client_ip] = recent
        return True


class TelegramGateway:
    """Handles Telegram Bot status, chat_id auto-discovery, and lead delivery."""

    def __init__(self, token: str) -> None:
        self.token = token.strip()
        self.bot_username: str | None = None
        self.bot_name: str | None = None
        self._timeout = ClientTimeout(total=10)

    @property
    def configured(self) -> bool:
        return bool(self.token)

    def _api_url(self, method: str) -> str:
        return f"https://api.telegram.org/bot{self.token}/{method}"

    def get_saved_chat_id(self) -> str | None:
        env_chat = os.environ.get("TELEGRAM_CHAT_ID", "").strip()
        if env_chat:
            return env_chat
        if CHAT_ID_FILE.exists():
            saved = CHAT_ID_FILE.read_text(encoding="utf-8").strip()
            if saved:
                return saved
        return None

    def save_chat_id(self, chat_id: str) -> None:
        DATA_DIR.mkdir(parents=True, exist_ok=True)
        CHAT_ID_FILE.write_text(str(chat_id).strip(), encoding="utf-8")

    async def fetch_bot_info(self, session: ClientSession) -> dict[str, object]:
        if not self.configured:
            return {"ok": False, "error": "missing_token"}
        try:
            async with session.get(self._api_url("getMe"), timeout=self._timeout) as resp:
                payload = await resp.json()
        except Exception as exc:
            logger.warning("Telegram getMe failed: %s", exc)
            return {"ok": False, "error": "network_error"}

        if payload.get("ok") and isinstance(payload.get("result"), dict):
            result = payload["result"]
            self.bot_username = result.get("username")
            self.bot_name = result.get("first_name")
            return {
                "ok": True,
                "bot_username": self.bot_username,
                "bot_name": self.bot_name,
            }
        return {"ok": False, "error": payload.get("description", "telegram_error")}

    async def discover_chat_id(self, session: ClientSession) -> str | None:
        existing = self.get_saved_chat_id()
        if existing:
            return existing
        if not self.configured:
            return None

        try:
            async with session.get(
                self._api_url("getUpdates"),
                params={"limit": 25, "allowed_updates": json.dumps(["message", "my_chat_member"])},
                timeout=self._timeout,
            ) as resp:
                payload = await resp.json()
        except Exception as exc:
            logger.warning("Telegram getUpdates failed: %s", exc)
            return None

        if not payload.get("ok"):
            return None

        updates = payload.get("result") or []
        for update in reversed(updates):
            msg = update.get("message") or update.get("edited_message")
            if msg and isinstance(msg.get("chat"), dict):
                chat_id = str(msg["chat"]["id"])
                self.save_chat_id(chat_id)
                logger.info("Discovered Telegram owner chat_id: %s", chat_id)
                return chat_id
            member = update.get("my_chat_member")
            if member and isinstance(member.get("chat"), dict):
                chat_id = str(member["chat"]["id"])
                self.save_chat_id(chat_id)
                logger.info("Discovered Telegram chat_id from my_chat_member: %s", chat_id)
                return chat_id
        return None

    async def send_lead(
        self,
        session: ClientSession,
        lead_id: str,
        lead: LeadRequest,
    ) -> dict[str, object]:
        if not self.configured:
            return {"delivered": False, "reason": "missing_token"}

        if not self.bot_username:
            await self.fetch_bot_info(session)

        chat_id = await self.discover_chat_id(session)
        if not chat_id:
            return {
                "delivered": False,
                "reason": "missing_chat_id",
                "bot_username": self.bot_username,
            }

        message_html = format_telegram_message(lead_id, lead)
        try:
            async with session.post(
                self._api_url("sendMessage"),
                json={
                    "chat_id": chat_id,
                    "text": message_html,
                    "parse_mode": "HTML",
                    "disable_web_page_preview": True,
                },
                timeout=self._timeout,
            ) as resp:
                payload = await resp.json()
        except Exception as exc:
            logger.exception("Telegram sendMessage network error")
            return {"delivered": False, "reason": f"network_error: {exc}"}

        if payload.get("ok"):
            return {
                "delivered": True,
                "bot_username": self.bot_username,
                "message_id": payload.get("result", {}).get("message_id"),
            }

        description = str(payload.get("description", "telegram_api_error"))
        if "chat not found" in description.lower() or "bot was blocked" in description.lower():
            if CHAT_ID_FILE.exists():
                CHAT_ID_FILE.unlink(missing_ok=True)
        return {
            "delivered": False,
            "reason": description,
            "bot_username": self.bot_username,
        }


def format_telegram_message(lead_id: str, lead: LeadRequest) -> str:
    """Format a clean, injection-safe HTML message for the shop owner."""
    esc = html.escape
    channel_labels = {
        "phone": "Telefon",
        "telegram": "Telegram",
        "whatsapp": "WhatsApp",
        "email": "E-mail",
    }
    customer_badge = "B2B / Firma" if lead.customer_type == "b2b" else "Klient indywidualny"
    lines = [
        f"<b>NOWE ZGŁOSZENIE • {esc(lead_id)}</b>",
        f"<i>KORO Auto Chemistry Polska</i>",
        "",
        f"<b>Klient:</b> {esc(lead.name)}",
        f"<b>Typ:</b> {customer_badge}",
        f"<b>Kontakt ({channel_labels[lead.contact_channel]}):</b> <code>{esc(lead.contact)}</code>",
    ]
    if lead.city:
        lines.append(f"<b>Miasto / Dostawa:</b> {esc(lead.city)}")
    if lead.customer_type == "b2b" and lead.nip:
        lines.append(f"<b>NIP:</b> <code>{esc(lead.nip)}</code>")
    if lead.car_or_business:
        lines.append(f"<b>Auto / Obiekt:</b> {esc(lead.car_or_business)}")

    if lead.items:
        lines.append("")
        lines.append("<b>Wybrana chemia:</b>")
        total = 0.0
        for item in lead.items:
            line_sum = item.unit_price_pln * item.qty
            total += line_sum
            lines.append(
                f"• [{esc(item.sku)}] {esc(item.name)} ({esc(item.volume)}) × {item.qty} = <b>{line_sum:.0f} zł</b>"
            )
        lines.append(f"<b>Szacunkowo:</b> {total:.0f} zł brutto")

    if lead.notes:
        lines.append("")
        lines.append(f"<b>Komentarz:</b>\n{esc(lead.notes)}")

    lines.append("")
    lines.append(f"<code>Język formularza: {lead.lang.upper()}</code>")
    return "\n".join(lines)


def mask_chat_id(chat_id: str | None) -> str | None:
    if not chat_id:
        return None
    if len(chat_id) <= 4:
        return "***"
    return f"{chat_id[:2]}***{chat_id[-3:]}"


async def append_lead_log(lead_id: str, lead: LeadRequest, tg_result: dict[str, object]) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    record = {
        "lead_id": lead_id,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "lead": lead.model_dump(),
        "telegram": tg_result,
    }
    async with aiofiles.open(LEADS_FILE, mode="a", encoding="utf-8") as f:
        await f.write(json.dumps(record, ensure_ascii=False) + "\n")


async def handle_health(request: web.Request) -> web.Response:
    gw: TelegramGateway = request.app["telegram"]
    session: ClientSession = request.app["http_session"]
    bot_info = await gw.fetch_bot_info(session) if not gw.bot_username else {
        "ok": True,
        "bot_username": gw.bot_username,
        "bot_name": gw.bot_name,
    }
    chat_id = await gw.discover_chat_id(session)
    return web.json_response({
        "status": "ok",
        "telegram": {
            "token_configured": gw.configured,
            "bot_reachable": bool(bot_info.get("ok")),
            "bot_username": gw.bot_username,
            "chat_connected": bool(chat_id),
            "chat_id_masked": mask_chat_id(chat_id),
        },
    })


async def handle_create_lead(request: web.Request) -> web.Response:
    limiter: RateLimiter = request.app["rate_limiter"]
    client_ip = request.remote or "unknown"
    if not limiter.allow(client_ip):
        return web.json_response(
            {"ok": False, "error": "rate_limited"},
            status=429,
        )

    try:
        raw_body = await request.json()
    except Exception:
        return web.json_response({"ok": False, "error": "invalid_json"}, status=400)

    try:
        lead = LeadRequest.model_validate(raw_body)
    except ValidationError as exc:
        return web.json_response(
            {"ok": False, "error": "validation_error", "details": exc.errors()},
            status=422,
        )

    lead_id = f"KORO-{datetime.now(timezone.utc).strftime('%m%d-%H%M%S')}"
    gw: TelegramGateway = request.app["telegram"]
    session: ClientSession = request.app["http_session"]
    tg_result = await gw.send_lead(session, lead_id, lead)
    await append_lead_log(lead_id, lead, tg_result)

    return web.json_response(
        {
            "ok": True,
            "lead_id": lead_id,
            "telegram_delivered": bool(tg_result.get("delivered")),
            "telegram_reason": tg_result.get("reason"),
            "bot_username": tg_result.get("bot_username"),
        },
        status=201,
    )


async def handle_index(_request: web.Request) -> web.FileResponse:
    return web.FileResponse(PUBLIC_DIR / "index.html")


async def on_startup(app: web.Application) -> None:
    app["http_session"] = ClientSession()
    gw: TelegramGateway = app["telegram"]
    if gw.configured:
        info = await gw.fetch_bot_info(app["http_session"])
        chat_id = await gw.discover_chat_id(app["http_session"])
        logger.info("Bot check: %s | chat_connected=%s", info, bool(chat_id))


async def on_cleanup(app: web.Application) -> None:
    session: ClientSession = app["http_session"]
    await session.close()


def create_app() -> web.Application:
    app = web.Application()
    app["telegram"] = TelegramGateway(os.environ.get("TELEGRAM_BOT_TOKEN", ""))
    app["rate_limiter"] = RateLimiter()

    app.on_startup.append(on_startup)
    app.on_cleanup.append(on_cleanup)

    app.router.add_get("/", handle_index)
    app.router.add_get("/api/health", handle_health)
    app.router.add_post("/api/leads", handle_create_lead)
    app.router.add_static("/", PUBLIC_DIR, show_index=False)
    return app


if __name__ == "__main__":
    default_host = "0.0.0.0" if os.environ.get("RAILWAY_ENVIRONMENT") else "127.0.0.1"
    host = os.environ.get("HOST", default_host)
    port = int(os.environ.get("PORT", "8080"))
    web.run_app(create_app(), host=host, port=port)
