import {
  discoverChatId,
  getTelegramToken,
  maskChatId,
  resolveBotInfo,
} from "../lib/telegram.ts";

export default async () => {
  const tokenConfigured = Boolean(getTelegramToken());
  const bot = await resolveBotInfo();
  const chatId = await discoverChatId();

  return Response.json({
    status: "ok",
    telegram: {
      token_configured: tokenConfigured,
      bot_reachable: bot.ok,
      bot_username: bot.username,
      chat_connected: Boolean(chatId),
      chat_id_masked: maskChatId(chatId),
    },
  });
};

export const config = {
  path: "/api/health",
  method: ["GET"],
};
