import { Api, Context } from "grammy";
import type { Update, UserFromGetMe } from "@grammyjs/types";
import { Message } from "grammy/out/platform";

export class ExtendedContext extends Context {
    constructor(update: Update, api: Api, me: UserFromGetMe) {
        super(update, api, me);
    }

    async replyToMessage(message: string): Promise<Message.TextMessage | undefined> {
        if (this.message && this.message.text) {
            return await this.reply(message, {
                reply_to_message_id: this.message.reply_to_message ? this.message.reply_to_message.message_id : this.message.message_id,
            });
        }

        return;
    }
}
