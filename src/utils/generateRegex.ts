import { connectToDB } from "../core/db/connect";

export async function generateRegex(): Promise<RegExp> {
    let re = "\\b(";

    const db = await connectToDB();
    const emotes = await db.collection("emotes").distinct("title");

    for (const emote of emotes) re += `${emote}|`;

    re = re.slice(0, -1);
    re += ")\\b";

    return new RegExp(re, "gm");
}
