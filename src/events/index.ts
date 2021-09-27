import { Bot, Composer, Context } from "grammy";
import { ExtendedContext } from "src/core/bot/context";

import findEmoteOnDB from "../core/db/searchEmote";
import { generateRegex } from "../utils/generateRegex";

const events = async (bot: Bot<ExtendedContext>): Promise<void> => {
    async function generateHearsMiddleware() {
        const regex = await generateRegex();
        const composer = new Composer();
        composer.hears(regex, async (ctx: Context) => {
            const emote = await findEmoteOnDB(ctx?.match?.[1] ?? "");

            if (emote) {
                await ctx.replyWithSticker(emote.toString(), {
                    reply_to_message_id: ctx?.message?.reply_to_message ? ctx.message.reply_to_message.message_id : ctx.message?.message_id,
                });
            }
        });
        return composer;
    }

    bot.lazy(generateHearsMiddleware);
};

export default events;
