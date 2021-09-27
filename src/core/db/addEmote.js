"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addEmote = void 0;
const connect_1 = require("./connect");
async function addEmote(emote, id) {
    const db = await connect_1.connectToDB();
    const collection = db.collection("emotes");
    return await collection.insertOne({
        title: emote,
        id: id,
    });
}
exports.addEmote = addEmote;
