import { ExtendedContext } from "../../core/bot/context";
import { addEmoteToDB } from "../../core/db/addEmote";

export default async (ctx: ExtendedContext): Promise<void> => {
    const emote_name = ctx?.match?.[1];
    let emote_id = ctx?.match?.[3];

    if (ctx?.from?.id == 321809180 || ctx?.from?.id == 252820288) {
        if (ctx?.message?.reply_to_message !== undefined)
            try {
                emote_id = ctx?.message?.reply_to_message?.sticker?.file_id as string;
            } catch {
                await ctx.replyToMessage("You must reply to a sticker!");
            }
        try {
            if (emote_name && emote_id) {
                await ctx.replyWithSticker(emote_id);
                await addEmoteToDB(emote_name, emote_id);
            }
        } catch (err) {
            await ctx.replyToMessage("Invalid emote.");
        }
    } else {
        await ctx.replyToMessage("Sorry, only admins can do this.");
    }
};
