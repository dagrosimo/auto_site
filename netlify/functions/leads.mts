import {
  callTelegramApi,
  clearCachedChatId,
  discoverChatId,
  formatTelegramMessage,
  getTelegramToken,
  resolveBotInfo,
  type LeadPayload,
} from "../lib/telegram.ts";

const rateHits = new Map<string, number[]>();

function allowRate(ip: string): boolean {
  const now = Date.now();
  const recent = (rateHits.get(ip) || []).filter((t) => now - t < 60_000);
  if (recent.length >= 12) {
    rateHits.set(ip, recent);
    return false;
  }
  recent.push(now);
  rateHits.set(ip, recent);
  return true;
}

export default async (req: Request) => {
  const clientIp =
    req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown";
  if (!allowRate(clientIp)) {
    return Response.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let lead: LeadPayload;
  try {
    lead = (await req.json()) as LeadPayload;
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = String(lead?.name || "").trim();
  const contact = String(lead?.contact || "").trim();
  if (name.length < 2 || contact.length < 3) {
    return Response.json({ ok: false, error: "validation_error" }, { status: 422 });
  }

  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const leadId = `KORO-${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}-${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}`;

  const bot = await resolveBotInfo();
  const chatId = await discoverChatId();

  let delivered = false;
  let reason: string | null = null;

  if (!getTelegramToken()) {
    reason = "missing_token";
  } else if (!chatId) {
    reason = "missing_chat_id";
  } else {
    try {
      const sent = await callTelegramApi("sendMessage", {
        chat_id: chatId,
        text: formatTelegramMessage(leadId, lead),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      });
      if (sent?.ok) {
        delivered = true;
      } else {
        reason = String(sent?.description || "telegram_api_error");
        if (reason.toLowerCase().includes("chat not found") || reason.toLowerCase().includes("blocked")) {
          clearCachedChatId();
        }
      }
    } catch (err) {
      reason = `network_error: ${String(err)}`;
    }
  }

  return Response.json(
    {
      ok: true,
      lead_id: leadId,
      telegram_delivered: delivered,
      telegram_reason: reason,
      bot_username: bot.username,
    },
    { status: 201 }
  );
};

export const config = {
  path: "/api/leads",
  method: ["POST"],
};
