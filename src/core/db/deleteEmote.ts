import { connectToDB } from "./connect";
import { ModifyResult, Document } from "mongodb";

export async function delEmoteFromDB(emote: string): Promise<ModifyResult<Document>> {
    const db = await connectToDB();
    const collection = db.collection("emotes");

    return await collection.findOneAndDelete({ title: emote });
}
