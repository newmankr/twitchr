import { ExtendedContext } from "../../core/bot/context";
import { connectToDB } from "../../core/db/connect";
import { delEmoteFromDB } from "../../core/db/deleteEmote";

export default async (ctx: ExtendedContext): Promise<void> => {
    if (ctx?.from?.id == 321809180 || ctx?.from?.id == 252820288) {
        const match = ctx?.match?.[1] ?? "";
        const db = await connectToDB();
        const emotes = await db.collection("emotes").distinct("title");

        if (emotes.includes(match)) {
            await delEmoteFromDB(match);
            await ctx.replyToMessage(`${match} deleted.`);
        } else {
            ctx.reply("Emote not found.");
        }
    } else {
        await ctx.replyToMessage("Sorry, only admins can do this.");
    }
};
