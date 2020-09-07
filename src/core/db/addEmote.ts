import { connectToDB } from "./connect";

export async function addEmote(emote: string, id: string) {
  const db = await connectToDB();
  const collection = db.collection("emotes");

  return await collection.insertOne({
    title: emote,
    id: id,
  });
}
