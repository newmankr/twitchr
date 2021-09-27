import { connectToDB } from "./connect";
import { InsertOneResult, Document } from "mongodb";

export async function addEmoteToDB(emote: string, id: string): Promise<InsertOneResult<Document>> {
    const db = await connectToDB();
    const collection = db.collection("emotes");

    return await collection.insertOne({
        title: emote,
        id: id,
    });
}
