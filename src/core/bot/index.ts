import { Bot, GrammyError, HttpError } from "grammy";
import { ExtendedContext } from "./context";

const bot = new Bot(String(process.env.BOT_TOKEN), {
    ContextConstructor: ExtendedContext,
});

bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e);
    } else {
        console.error("Unknown error:", e);
    }
});

export default bot;
