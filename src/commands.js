
export function registerCommands(bot) {
  const jokes = [
    "Подбор увидел вашу победную серию и вызвал подкрепление из ботов. 🤖",
    "LGDT: пять игроков, пять планов, ноль командной игры.",
    "Минус звезда. Зато теперь вы на одну звезду ближе к психологу.",
    "Враг играет в MLBB. Наш подбор — в отдельную игру.",
    "Статистика говорит, что всё нормально. Статистика явно из команды противника.",
    "Союзник написал «изи». Счёт 0/9. Изи было только проиграть.",
    "Вы не проиграли катку. Вы помогли врагам выполнить ежедневные задания.",
    "Бот хотя бы следует алгоритму. А у тебя какой план, легенда?",
    "Пять минут игры — и уже хочется сменить не героя, а жизнь.",
    "Подбор: баланс найден. Баланс находится в пользу противника."
  ];

  const memes = [
    "Когда лесник не приходит на помощь: 🧍🌳💀",
    "Зашёл поднять ранг. Поднял только пульс.",
    "Команда: «Играй вместе». Каждый союзник: «Я пошёл проверять кусты».",
    "Когда враг с 1 HP уходит, а ты теряешь башню: 🤡",
    "Поражение? Нет, это скрытая проверка нервной системы.",
    "Подбор настолько равный, что хочется проверить его на детекторе лжи.",
    "Когда союзник берёт героя с винрейтом 32% и говорит «доверяй».",
    "План на катку: не тильтовать. План закончен."
  ];

  const roasts = [
    "Твой ранг держится на честном слове и бесплатном Wi-Fi.",
    "Ты не фидишь — ты спонсируешь развитие вражеской команды.",
    "Твоя мини-карта уже написала заявление на увольнение.",
    "Если бы за уверенность давали звёзды, ты был бы Мифик Иммортал.",
    "Урон есть. По врагам — это уже другой вопрос.",
    "Даже автоподбор сейчас сделал вид, что не знаком с тобой."
  ];

  const random = (arr) =>
    arr[Math.floor(Math.random() * arr.length)];

  const groups = new Map();
  const lastReaction = new Map();
  const lastRandomPost = new Map();
  const autoEnabled = new Map();

  bot.command("start", async (ctx) => {
    await ctx.reply(
      "Добро пожаловать в LGDT! ⚔️\n" +
      "Я здесь, чтобы комментировать ваши рейтинговые страдания.\n" +
      "Напиши /help для списка команд."
    );
  });

  bot.command("help", async (ctx) => {
    await ctx.reply(
      "⚔️ Команды LGDT:\n\n" +
      "/joke — шутка про MLBB\n" +
      "/meme — мем про рейтинг\n" +
      "/roast — случайный подкол\n" +
      "/ping — проверка бота\n" +
      "/id — ID чата\n" +
      "/auto_on — включить автомемы (админы)\n" +
      "/auto_off — выключить автомемы (админы)"
    );
  });

  bot.command("joke", async (ctx) => {
    await ctx.reply(random(jokes));
  });

  bot.command("meme", async (ctx) => {
    await ctx.reply(random(memes));
  });

  bot.command("roast", async (ctx) => {
    await ctx.reply(random(roasts));
  });

  bot.command("ping", async (ctx) => {
    await ctx.reply("Я жив. В отличие от вашей победной серии. 🫡");
  });

  bot.command("id", async (ctx) => {
    await ctx.reply(`ID этого чата: ${ctx.chat.id}`);
  });

  async function isAdmin(ctx) {
    if (!ctx.from || !ctx.chat) return false;
    if (ctx.chat.type === "private") return true;

    try {
      const member = await ctx.getChatMember(ctx.from.id);
      return ["creator", "administrator"].includes(member.status);
    } catch {
      return false;
    }
  }

  bot.command("auto_on", async (ctx) => {
    if (!(await isAdmin(ctx))) {
      return ctx.reply("Эта команда только для админов чата. 👀");
    }

    autoEnabled.set(ctx.chat.id, true);
    groups.set(ctx.chat.id, true);
    await ctx.reply(
      "🤖 Автомемы включены! Подбор, приготовься."
    );
  });

  bot.command("auto_off", async (ctx) => {
    if (!(await isAdmin(ctx))) {
      return ctx.reply("Эта команда только для админов чата. 👀");
    }

    autoEnabled.set(ctx.chat.id, false);
    await ctx.reply(
      "🤐 Автомемы выключены. Боты тоже иногда отдыхают."
    );
  });

  bot.on("message:text", async (ctx) => {
    if (!["group", "supergroup"].includes(ctx.chat.type)) return;
    if (ctx.from?.is_bot) return;

    const chatId = ctx.chat.id;
    groups.set(chatId, true);

    if (autoEnabled.get(chatId) === undefined) {
      autoEnabled.set(chatId, true);
    }

    if (!autoEnabled.get(chatId)) return;

    const text = ctx.message.text.toLowerCase();
    if (text.startsWith("/")) return;

    const now = Date.now();
    if (now - (lastReaction.get(chatId) || 0) < 30000) {
      return;
    }

    let reply = null;

    if (/\b(изи|easy)\b/.test(text)) {
      reply = "«Изи», говорит человек, который сейчас проверит статистику. 🤡";
    } else if (/слил|слили|слив катк|поражени|луз|lose/.test(text)) {
      reply = random([
        "Подбор записал ваш результат и довольно хихикнул. 🤖",
        "Это не слив. Это инвестиция в настроение противника.",
        "Минус звезда — подбор доволен собой."
      ]);
    } else if (/вин|побед|победили|win/.test(text)) {
      reply = random([
        "ПОБЕДА?! Срочно сохраните реплей, такое бывает не каждый сезон. 🏆",
        "Поздравляю! Подбор временно уснул.",
        "LGDT победили! Проверяем, не была ли это обучающая катка."
      ]);
    } else if (/бот|боты|подбор|мма|матчмейкинг/.test(text)) {
      reply = random([
        "🤖 Боты услышали своё имя и уже идут в вашу команду.",
        "Подбор не ошибается. Он просто экспериментирует на вас.",
        "Ваше обращение в службу подбора принято. Ответ: проиграйте ещё раз."
      ]);
    }

    if (reply) {
      lastReaction.set(chatId, now);
      await ctx.reply(reply);
    }
  });

  // Случайный мем примерно раз в 45 минут на каждый активный чат.
  setInterval(async () => {
    for (const chatId of groups.keys()) {
      if (!autoEnabled.get(chatId)) continue;

      const now = Date.now();
      if (now - (lastRandomPost.get(chatId) || 0) < 45 * 60 * 1000) {
        continue;
      }

      lastRandomPost.set(chatId, now);

      try {
        await bot.api.sendMessage(
          chatId,
          "🎲 Случайный прогноз подбора: " + random(memes)
        );
      } catch (err) {
        console.error("Не удалось отправить мем:", err.message);
      }
    }
  }, 60 * 1000);
}
