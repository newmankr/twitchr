import { setupEmoteHandlers } from "./commands/emotes";
import { bot } from "./core/bot/bot";
import { updateEmoteList } from "./helpers/updateEmoteList";
import { setupInlineQuery } from "./helpers/inlineQueryHelper";

setupInlineQuery(bot);
setupEmoteHandlers(bot);
updateEmoteList();

bot.startPolling();
