import { ExtendedContext } from "../../core/bot/context";
import findEmoteOnDB from "../../core/db/searchEmote";

export default async (ctx: ExtendedContext): Promise<void> => {
    const emote = await findEmoteOnDB(ctx?.match?.[1] ?? "");

    if (emote) await ctx.replyWithSticker(emote.toString());
    else await ctx.replyToMessage("Emote not found.");
};
