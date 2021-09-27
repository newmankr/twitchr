"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findEmote = void 0;
const connect_1 = require("./connect");
async function findEmote(emote) {
    const db = await connect_1.connectToDB();
    const collection = await db.collection("emotes");
    const result = await collection.findOne({ title: emote });
    if (result != null) return result.id;
}
exports.findEmote = findEmote;
