import { getSession } from "@auth0/nextjs-auth0";
import stripeInit from "stripe";
//import clientPromise from "../../lib/mongodb";

//initialize stripe
const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  //get user from auth0
  const { user } = await getSession(req, res);

  //start stripe checkout
  const lineItems = [
    {
      //use stripe product to identify what customer is paying for
      price: process.env.STRIPE_PRODUCT_PRICE_ID,
      quantity: 1,
    },
  ];

  //----checkout----

  //success url will differ when in dev or prod
  const protocol =
    process.env.NODE_ENV === "development" ? "http://" : "https://";
  const host = req.headers.host;

  const checkoutSession = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${protocol}${host}/success`,
    //add metadata to pass the user that made the payment
    payment_intent_data: {
      metadata: {
        //auth0 user info
        sub: user.sub,
      },
    },
    //needs to be repeated in metadata
    metadata: {
      sub: user.sub,
    },
  });

  /*   //connect to mongoDB - moved to webhook
  const client = await clientPromise;
  const db = client.db("BloggerOpenAI");

  //add credits to account
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
  ); */

  res.status(200).json({ session: checkoutSession });
}
