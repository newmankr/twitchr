import { MongoClient, Db } from "mongodb";

let cachedDB: Db | null = null;

export async function connectToDB() {
  if (cachedDB) return cachedDB;

  const client = await MongoClient.connect(process.env.MONGO_URL as string, {
    useUnifiedTopology: true,
  });
  const db = client.db("twitchrbot");

  cachedDB = db;

  return db;
}
