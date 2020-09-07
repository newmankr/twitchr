import { Telegraf, Markup } from "telegraf";
import { TelegrafContext } from "telegraf/typings/context";
import { InlineQueryResultArticle } from "telegraf/typings/telegram-types";

const fetch = require("node-fetch");

async function searchEmoteAPI(query: string) {
  const response = await fetch(
    `https://api.frankerfacez.com/v1/emoticons?q=${query}&sort=count-desc`
  );
  const json = await response.json();
  const emoticons = Object.entries(json.emoticons);

  let results = [];

  for (let i = 0; i < emoticons.length; ++i) {
    const emote: any = emoticons[i][1];

    results.push({
      id: i,
      title: `${emote.name} by ${emote.owner.display_name}`,
      thumbnail:
        "https:" +
        emote.urls[Object.keys(emote.urls)[Object.keys(emote.urls).length - 1]],
    });
  }

  return results;
}

export function setupInlineQuery(bot: Telegraf<TelegrafContext>) {
  bot.on("inline_query", async ({ inlineQuery, answerInlineQuery }) => {
    const results = await searchEmoteAPI(inlineQuery!.query);

    const emotes: InlineQueryResultArticle[] = results.map(
      ({ id, title, thumbnail }) => ({
        type: "article",
        id: id.toString(),
        title: title,
        thumb_url: thumbnail,
        input_message_content: {
          message_text: title,
        },
        reply_markup: Markup.inlineKeyboard([
          Markup.urlButton("Go to emote", thumbnail),
        ]),
      })
    );

    return answerInlineQuery(emotes);
  });
}
