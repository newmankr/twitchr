import { connectToDB } from "./connect";

export async function findEmote(emote: string) {
  const db = await connectToDB();
  const collection = await db.collection("emotes");
  const result = await collection.findOne({ title: emote });

  if (result != null) return result.id;
}
