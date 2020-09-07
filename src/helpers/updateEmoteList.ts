import { generateRegex } from "../utils/generateRegex";
import { bot } from "../core/bot/bot";
import { findEmote } from "../core/db/searchEmote";

export async function updateEmoteList() {
  const emotes_list = await generateRegex();

  bot.hears(emotes_list, async (ctx) => {
    const emote = await findEmote(ctx?.match![1]);

    if (emote != undefined)
      if (ctx?.message?.reply_to_message != undefined)
        ctx.replyWithSticker(emote, {
          reply_to_message_id: ctx.message.reply_to_message.message_id,
        });
      else ctx.replyWithSticker(emote);
    else console.log("emote not found");
  });
}
