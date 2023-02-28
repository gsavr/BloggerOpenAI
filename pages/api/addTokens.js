import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  const { user } = await getSession(req, res);

  const client = await clientPromise;
  const db = client.db("BloggerOpenAI");

  const userProfile = await db.collection("users").updateOne(
    {
      //search for user
      auth0Id: user.sub,
    },
    {
      //increase by 10 tokens
      $inc: {
        availableTokens: 10,
      },
      //if user doesn't exist -- add them
      $setOnInsert: {
        auth0Id: user.sub,
      },
    },
    {
      //upsert means if no user - create & add tokens ; if user - just update tokens
      upsert: true,
    }
  );

  res.status(200).json({ name: "John Doe" });
}
