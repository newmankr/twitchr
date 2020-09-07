import { connectToDB } from "../core/db/connect";
import { findEmote } from "../core/db/searchEmote";
import { TelegrafContext } from "telegraf/typings/context";
import { addEmote } from "../core/db/addEmote";
import { updateEmoteList } from "../helpers/updateEmoteList";
import { delEmote } from "../core/db/deleteEmote";
import Telegraf from "telegraf";

export function setupEmoteHandlers(bot: Telegraf<TelegrafContext>) {
  bot.hears(/\/emotes/, async (ctx) => {
    const db = await connectToDB();
    const emotes = await db.collection("emotes").distinct("title");

    let result: string = "";

    for (let i = 0; i < emotes.length; i++) {
      const str = `-${emotes[i]}\n`;

      if (result.length + str.length > 4000) {
        ctx.reply(result);
        result = str;
      } else {
        result += str;

        if (i == emotes.length - 1) {
          ctx.reply(result);
        }
      }
    }
  });

  bot.hears(/\/searchemote (\w+)/, async (ctx) => {
    const emote = await findEmote(ctx?.match![1]);

    if (emote !== undefined) ctx.replyWithSticker(emote);
    else ctx.reply("Emote not found.");
  });

  bot.hears(/\/addemote (\w+)(\s(.+))?/, async (ctx) => {
    let emote_name = ctx?.match![1];
    let emote_id = ctx?.match![3];

    if (ctx?.from?.id == 321809180 || ctx?.from?.id == 252820288) {
      if (ctx?.message?.reply_to_message !== undefined)
        try {
          emote_id = ctx?.message?.reply_to_message?.sticker?.file_id as string;
        } catch {
          ctx.reply("You must reply to a sticker!");
        }
      try {
        ctx
          .replyWithSticker(emote_id)
          .then(async () => {
            await addEmote(emote_name, emote_id);

            updateEmoteList();
          })
          .catch(() => {
            ctx.reply("Invalid emote.");
          });
      } catch (err) {
        throw err;
      }
    } else {
      ctx.reply("Sorry, only admins can do this.");
    }
  });

  bot.hears(/\/delemote (\w+)/, async (ctx) => {
    if (ctx?.from?.id == 321809180 || ctx?.from?.id == 252820288) {
      const db = await connectToDB();
      const emotes = await db.collection("emotes").distinct("title");

      if (emotes.includes(`${ctx?.match![1]}`)) {
        await delEmote(ctx?.match![1]);

        ctx.reply(`${ctx?.match![1]} deleted.`);

        updateEmoteList();
      } else {
        ctx.reply("Emote not found.");
      }
    } else {
      ctx.reply("Sorry, only admins can do this.");
    }
  });
}
