import TelegramBot, { CallbackQuery } from "node-telegram-bot-api";
import cron from "node-cron";

console.log("starting");


const token = '7535285653:AAGdPvYYN56BidOIO5Y7hwD-9pRiFWoGHqQ';

const marked = 0;

const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  if (message === "/start") {
    cron.schedule('0 21 * * * ', () => {
      bot.sendMessage(chatId, "Выпей таблетки")
    }, {
      timezone: "Europe/Moscow"
    });

    cron.schedule('22 10 * * * ', () => {
      bot.sendMessage(chatId, "Выпила таблетки?", {
        reply_markup: {
          inline_keyboard: [[{
            text: "Да",
            callback_data: "yes"
          }], [{
            text: "Нет",
            callback_data: "No"
          }]]
        }
      })
    }, {
      timezone: "Europe/Moscow"
    });

    bot.sendMessage(chatId, "Привет, этот бот создан для напоминания Крис пить таблетки). \n Я буду тебе напоминать каждый день в 21:00, потом перемпрашивать через 15 минут")
  }
  else bot.sendMessage(chatId, "Что ты несешь?");
});

bot.on("callback_query", (query: CallbackQuery) => {
  const data = query.data;
  const chatId = query.from.id;
  if (data === "yes") {
    bot.sendMessage(chatId, "Молодец❤️")
  } else {
    bot.sendMessage(chatId, "Выпей эти ебучие таблетки!😠")
  }
})