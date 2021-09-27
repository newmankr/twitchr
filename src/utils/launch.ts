import { Bot } from "grammy";
import { ExtendedContext } from "../core/bot/context";

import express from "express";
import { webhookCallback } from "grammy";

const production = async (bot: Bot<ExtendedContext>): Promise<void> => {
    try {
        const app = express();

        app.use(express.json());
        app.use(`/${process.env.SECRET_PATH}`, webhookCallback(bot, "express"));

        app.listen(Number(process.env.PORT), async () => {
            await bot.api.setWebhook(`${process.env.WEBHOOK_URL}/${process.env.SECRET_PATH}`);
            console.log(`[SERVER] Bot starting webhook`);
        });
    } catch (e) {
        console.error(e);
    }
};

const development = async (bot: Bot<ExtendedContext>): Promise<void> => {
    try {
        await bot.api.deleteWebhook();
        console.log("[SERVER] Bot starting polling");
        await bot.start();
    } catch (e) {
        console.error(e);
    }
};

export { production, development };
