
export function registerCommands(bot) {
  const jokes = [
    "Подбор в MLBB настолько честный, что даже боты не верят в победу.",
    "LGDT — это не просто клан. Это коллективная терапия после рейтинга.",
    "План на катку: не тильтовать. План провален на первой минуте.",
    "Враг играет командой, наши — каждый в своём сериале.",
    "Минус звезда — плюс повод обвинить подбор."
  ];

  const memes = [
    "Когда союзник пишет «изи», а у него 0/7: 🤡",
    "Зашёл поднять ранг. Вышел поднять давление.",
    "Подбор увидел победную серию и решил её исправить.",
    "Когда все обвиняют лесника, даже если лесника нет."
  ];

  const random = (items) =>
    items[Math.floor(Math.random() * items.length)];

  bot.command("start", async (ctx) => {
    await ctx.reply(
      "Добро пожаловать в LGDT! ⚔️\n\n" +
      "Я клановый бот по Mobile Legends.\n" +
      "Напиши /help, чтобы увидеть команды."
    );
  });

  bot.command("help", async (ctx) => {
    await ctx.reply(
      "⚔️ Команды LGDT:\n\n" +
      "/joke — шутка про MLBB\n" +
      "/meme — жизненная ситуация из рейтинга\n" +
      "/ping — проверить, жив ли бот\n" +
      "/id — узнать ID чата"
    );
  });

  bot.command("joke", async (ctx) => {
    await ctx.reply(random(jokes));
  });

  bot.command("meme", async (ctx) => {
    await ctx.reply(random(memes));
  });

  bot.command("ping", async (ctx) => {
    await ctx.reply("Я жив! А вот ваша звезда под вопросом. 🫡");
  });

  bot.command("id", async (ctx) => {
    await ctx.reply(`ID этого чата: ${ctx.chat.id}`);
  });
}
