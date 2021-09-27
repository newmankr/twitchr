import { Bot } from "grammy";
import { ExtendedContext } from "../core/bot/context";

import emotes from "./emotes/emotes";
import searchEmote from "./emotes/searchEmote";
import addEmote from "./emotes/addEmote";
import delEmote from "./emotes/delEmote";

const commands = async (bot: Bot<ExtendedContext>): Promise<void> => {
    bot.hears(/\/emotes/, emotes);
    bot.hears(/\/searchemote (\w+)/, searchEmote);
    bot.hears(/\/addemote (\w+)(\s(.+))?/, addEmote);
    bot.hears(/\/delemote (\w+)/, delEmote);
};

export default commands;
