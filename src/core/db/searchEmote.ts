import { connectToDB } from "./connect";

export default async function findEmoteOnDB(emote: string): Promise<number | null> {
    const db = await connectToDB();
    const collection = db.collection("emotes");
    const result = await collection.findOne({ title: emote });

    return result?.id;
}
