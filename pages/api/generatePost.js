import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { Configuration, OpenAIApi } from "openai";
import clientPromise from "../../lib/mongodb";

export default withApiAuthRequired(async function handler(req, res) {
  //user from auth0
  const { user } = await getSession(req, res);
  //connect to mongoDB
  const client = await clientPromise;
  const db = client.db("BloggerOpenAI");

  //find user in db
  const userProfile = await db.collection("users").findOne({
    auth0Id: user.sub,
  });

  //if user doesn't exist, or does not have tokens
  if (!userProfile?.availableTokens) {
    res.status(403);
    return;
  }

  //connect to OpenAI
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);
  //alternate model -- less time
  const model = " , text-curie-001";

  //from form in generate blog component
  const { topic, keywords } = req.body;

  //backend validation of form
  if (!topic || !keywords) {
    res.status(422);
    return;
  }
  if (topic.length > 120 || keywords.length > 80) {
    res.status(422);
    return;
  }

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    temperature: 0,
    //tokens are how much data you are willing to use, can go up to 3000, but it is paid
    max_tokens: 800,
    prompt: `Write a detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
    The content should be formatted in SEO-friendly HTML.
    The response must also include appropriate HTML title and meta description content. 
    The return format must be stringified JSON in the following format: 
    {
      "postContent": post content here
      "title": title goes here
      "metaDescription": meta description goes here
    } `,
  });
  //console.log(response);
  //update user with tokens spent
  await db.collection("users").updateOne(
    {
      auth0Id: user.sub,
    },
    {
      $inc: {
        availableTokens: -2,
      },
    }
  );

  //parse response into JSON
  const parsed = await JSON.parse(
    response.data.choices[0]?.text.split("\n").join("")
  );

  //store post into db library
  const post = await db.collection("posts").insertOne({
    postContent: parsed?.postContent,
    title: parsed?.title,
    metaDescription: parsed?.metaDescription,
    topic,
    keywords,
    userId: userProfile._id,
    created: new Date(),
  });

  //console.log(post);
  //post return an acknowleged and insertedId

  res.status(200).json({
    postId: post.insertedId,
  });
});
