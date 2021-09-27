"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delEmote = void 0;
const connect_1 = require("./connect");
async function delEmote(emote) {
    const db = await connect_1.connectToDB();
    const collection = db.collection("emotes");
    return await collection.findOneAndDelete({ title: emote });
}
exports.delEmote = delEmote;
