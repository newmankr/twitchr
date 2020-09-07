import { connectToDB } from "./connect";

export async function delEmote(emote: string) {
  const db = await connectToDB();
  const collection = db.collection("emotes");

  return await collection.findOneAndDelete({ title: emote });
}
