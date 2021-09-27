import { ExtendedContext } from "../../core/bot/context";
import { connectToDB } from "../../core/db/connect";

export default async (ctx: ExtendedContext): Promise<void> => {
    const db = await connectToDB();
    const emotes = await db.collection("emotes").distinct("title");

    let result = "";

    for (let i = 0; i < emotes.length; i++) {
        const str = i === emotes.length - 1 ? `${emotes[i]}` : `${emotes[i]}, `;

        if (result.length + str.length > 4000) {
            await ctx.replyToMessage(result);
            result = str;
        } else {
            result += str;

            if (i == emotes.length - 1) {
                await ctx.replyToMessage(result);
            }
        }
    }
};
