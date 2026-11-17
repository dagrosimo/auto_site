/** Shared Telegram Bot API helpers for Netlify Functions (zero external deps). */

export interface LeadItem {
  sku?: string;
  name?: string;
  volume?: string;
  qty?: number;
  unit_price_pln?: number;
}

export interface LeadPayload {
  name?: string;
  contact?: string;
  contact_channel?: string;
  customer_type?: string;
  city?: string;
  nip?: string;
  car_or_business?: string;
  notes?: string;
  items?: LeadItem[];
  lang?: string;
}

declare const Netlify: {
  env: {
    get(key: string): string | undefined;
  };
};

let cachedBotUsername: string | null = null;
let cachedChatId: string | null = null;

export function getTelegramToken(): string {
  return (Netlify.env.get("TELEGRAM_BOT_TOKEN") || "").trim();
}

export function getConfiguredChatId(): string {
  return (Netlify.env.get("TELEGRAM_CHAT_ID") || "").trim();
}

export function maskChatId(id: string | null): string | null {
  if (!id) return null;
  if (id.length <= 4) return "***";
  return `${id.slice(0, 2)}***${id.slice(-3)}`;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function callTelegramApi(method: string, body?: unknown): Promise<Record<string, any>> {
  const token = getTelegramToken();
  if (!token) {
    return { ok: false, description: "missing_token" };
  }
  const url = `https://api.telegram.org/bot${token}/${method}`;
  const res = await fetch(
    url,
    body
      ? {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(10_000),
        }
      : { signal: AbortSignal.timeout(10_000) }
  );
  return (await res.json()) as Record<string, any>;
}

export async function resolveBotInfo(): Promise<{ ok: boolean; username: string | null }> {
  const token = getTelegramToken();
  if (!token) return { ok: false, username: null };
  if (cachedBotUsername) return { ok: true, username: cachedBotUsername };

  try {
    const data = await callTelegramApi("getMe");
    if (data?.ok && data.result?.username) {
      cachedBotUsername = String(data.result.username);
      return { ok: true, username: cachedBotUsername };
    }
  } catch {
    // Network / timeout handled gracefully below
  }
  return { ok: false, username: null };
}

export async function discoverChatId(): Promise<string | null> {
  const envChat = getConfiguredChatId();
  if (envChat) return envChat;
  if (cachedChatId) return cachedChatId;
  if (!getTelegramToken()) return null;

  try {
    const allowed = encodeURIComponent(JSON.stringify(["message", "my_chat_member"]));
    const data = await callTelegramApi(`getUpdates?limit=25&allowed_updates=${allowed}`);
    if (!data?.ok || !Array.isArray(data.result)) return null;

    for (let i = data.result.length - 1; i >= 0; i--) {
      const u = data.result[i];
      const chat = u?.message?.chat || u?.edited_message?.chat || u?.my_chat_member?.chat;
      if (chat?.id != null) {
        cachedChatId = String(chat.id);
        return cachedChatId;
      }
    }
  } catch {
    // Ignore transient network failures
  }
  return null;
}

export function clearCachedChatId(): void {
  cachedChatId = null;
}

export function formatTelegramMessage(leadId: string, lead: LeadPayload): string {
  const channels: Record<string, string> = {
    phone: "Telefon",
    telegram: "Telegram",
    whatsapp: "WhatsApp",
    email: "E-mail",
  };
  const badge = lead.customer_type === "b2b" ? "B2B / Firma" : "Klient indywidualny";
  const channel = channels[String(lead.contact_channel || "phone")] || "Telefon";

  const lines = [
    `<b>NOWE ZGŁOSZENIE • ${escapeHtml(leadId)}</b>`,
    "<i>KORO Auto Chemistry Polska</i>",
    "",
    `<b>Klient:</b> ${escapeHtml(String(lead.name || ""))}`,
    `<b>Typ:</b> ${badge}`,
    `<b>Kontakt (${channel}):</b> <code>${escapeHtml(String(lead.contact || ""))}</code>`,
  ];

  if (lead.city) {
    lines.push(`<b>Miasto / Dostawa:</b> ${escapeHtml(String(lead.city))}`);
  }
  if (lead.customer_type === "b2b" && lead.nip) {
    lines.push(`<b>NIP:</b> <code>${escapeHtml(String(lead.nip))}</code>`);
  }
  if (lead.car_or_business) {
    lines.push(`<b>Auto / Obiekt:</b> ${escapeHtml(String(lead.car_or_business))}`);
  }

  if (Array.isArray(lead.items) && lead.items.length > 0) {
    lines.push("", "<b>Wybrana chemia:</b>");
    let total = 0;
    for (const item of lead.items.slice(0, 30)) {
      const qty = Math.max(1, Math.min(999, Number(item.qty) || 1));
      const price = Math.max(0, Number(item.unit_price_pln) || 0);
      const sum = qty * price;
      total += sum;
      lines.push(
        `• [${escapeHtml(String(item.sku || ""))}] ${escapeHtml(String(item.name || ""))} (${escapeHtml(String(item.volume || ""))}) × ${qty} = <b>${sum.toFixed(0)} zł</b>`
      );
    }
    lines.push(`<b>Szacunkowo:</b> ${total.toFixed(0)} zł brutto`);
  }

  if (lead.notes) {
    lines.push("", `<b>Komentarz:</b>\n${escapeHtml(String(lead.notes))}`);
  }

  lines.push("", `<code>Język formularza: ${escapeHtml(String(lead.lang || "pl").toUpperCase())}</code>`);
  return lines.join("\n");
}
