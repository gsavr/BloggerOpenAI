import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import clientPromise from "../lib/mongodb";

export const getLandingProps = async (ctx) => {
  //conect to mongoDB
  const client = await clientPromise;
  const db = client.db("BloggerOpenAI");
  //find default db user
  const user = await db.collection("users").findOne({
    auth0Id: process.env.DEFAULT_BLOGGER,
  });

  //find posts using params postId that belongs to user
  const posts = await db
    .collection("posts")
    .find({
      userId: user._id,
    })
    //sort from newest to oldest
    .sort({ created: -1 })
    .toArray();

  return {
    //need to convert date and id --  cannot use within json
    posts: posts.map(({ created, _id, userId, ...rest }) => ({
      _id: _id.toString(),
      created: format(
        utcToZonedTime(new Date(created), "America/New_York"),
        "ccc PPPp"
      ),
      ...rest,
    })),
  };
};
//.toString().split(" ").slice(0, 5).join(" ").slice(0, -3)
