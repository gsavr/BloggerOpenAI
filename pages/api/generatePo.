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
  const model = "gpt-3.5-turbo , ";

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

  const postContentResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a blog post generator.",
      },
      {
        role: "user",
        content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
      The response should be formatted in SEO-friendly HTML, 
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
      },
    ],
    temperature: 0,
  });

  const postContent = postContentResponse.data.choices[0]?.message.content;

  const titleResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a blog post generator.",
      },
      {
        role: "user",
        content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
      The response should be formatted in SEO-friendly HTML, limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
      },
      {
        role: "assistant",
        content: postContent,
      },
      {
        role: "user",
        content: "Generate appropriate title tag text for the above blog post",
      },
    ],
    temperature: 0,
  });

  const metaDescriptionResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a blog post generator.",
      },
      {
        role: "user",
        content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
      The response should be formatted in SEO-friendly HTML, 
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
      },
      {
        role: "assistant",
        content: postContent,
      },
      {
        role: "user",
        content:
          "Generate SEO-friendly meta description content for the above blog post",
      },
    ],
    temperature: 0,
  });

  const title = titleResponse.data.choices[0]?.message.content;
  const metaDescription =
    metaDescriptionResponse.data.choices[0]?.message.content;

  // console.log("Post Content: ", postContent);
  // console.log("Title: ", title);
  // console.log("Meta Description: ", metaDescription);

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

  //store post into db library
  const post = await db.collection("posts").insertOne({
    postContent: postContent || "",
    title: title || "",
    metaDescription: metaDescription || "",
    topic,
    keywords,
    userId: userProfile._id,
    created: new Date(),
  });

  //console.log(post);
  //post returns an acknowleged and insertedId

  res.status(200).json({
    postId: post.insertedId,
  });
});
