import { MongoClient, Db } from "mongodb";

let cachedDB: Db | null = null;

export async function connectToDB(): Promise<Db> {
    if (cachedDB) return cachedDB;

    const client = await MongoClient.connect(process.env.MONGO_URL as string);
    const db = client.db("twitchrbot");

    cachedDB = db;

    return db;
}
