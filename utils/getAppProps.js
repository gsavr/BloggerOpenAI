import { getSession } from "@auth0/nextjs-auth0";
import { format } from "date-fns";
import clientPromise from "../lib/mongodb";

export const getAppProps = async (cntxt) => {
  //get user from auth0
  const userSession = await getSession(cntxt.req, cntxt.res);
  //conect to mongoDB
  const client = await clientPromise;
  const db = client.db("BloggerOpenAI");
  //find db user that matches auth0
  const user = await db.collection("users").findOne({
    auth0Id: userSession.user.sub,
  });
  //check whether the user exists in db with posts and tokens
  if (!user) {
    return {
      availableTokens: 2,
      posts: [],
    };
  }

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
    availableTokens: user.availableTokens,
    //need to conver date and id --  cannot use within json
    posts: posts.map(({ created, _id, userId, ...rest }) => ({
      _id: _id.toString(),
      created: format(new Date(created), "ccc PPPp"),
      ...rest,
    })),
    postId: cntxt.params?.postId || null,
  };
};
