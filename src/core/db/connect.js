"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = void 0;
const mongodb_1 = require("mongodb");
let cachedDB = null;
async function connectToDB() {
    if (cachedDB) return cachedDB;
    const client = await mongodb_1.MongoClient.connect(process.env.MONGO_URL, {
        useUnifiedTopology: true,
    });
    const db = client.db("twitchrbot");
    cachedDB = db;
    return db;
}
exports.connectToDB = connectToDB;
