
import { Bot } from "grammy";
import { registerCommands } from "./src/commands.js";

const token =
  process.env.TELEGRAM_BOT_TOKEN ||
  process.env.BOT_TOKEN ||
  process.env.TELEGRAM_TOKEN ||
  process.env.TOKEN;

if (!token) {
  console.error("Не найден токен Telegram-бота в переменных окружения.");
  process.exit(1);
}

const bot = new Bot(token);

registerCommands(bot);

bot.catch((err) => {
  console.error("Ошибка бота:", err.error ?? err);
});

bot.start();
console.log("LGDT-бот запущен!");
