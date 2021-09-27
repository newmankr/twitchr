require("dotenv").config();

import commands from "./commands";
import bot from "./core/bot";
import events from "./events";
import { development, production } from "./utils/launch";

commands(bot);
events(bot);

process.env.NODE_ENV === "development" ? development(bot) : production(bot);
