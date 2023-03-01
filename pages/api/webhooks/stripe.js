/// need to allow endpoints to be available since next.js does not allow it
import Cors from "micro-cors";
import stripeInit from "stripe";
import verifyStripe from "@webdeveducation/next-verify-stripe";
import clientPromise from "../../../lib/mongodb";

const cors = Cors({
  allowMethods: ["POST", "HEAD"],
});

//built in next.js feature --  it will pick up on this config and apply settings
export const config = {
  //next.js ALWAYS parses data from an API endpoint
  api: {
    bodyParser: false,
  },
};

const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);
//using stripe CLI - we can create an endpoint secret
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

/* IN CLI-- `stripe listen --forward-to localhost:3000/api/webhooks/stripe` ---
get sign in secret */

const handler = async (req, res) => {
  if (req.method === "POST") {
    //verifyStripe will return the event that Stripe posted to the webhook
    //event var will contain all data associated with successful payment
    let event;
    try {
      event = await verifyStripe({
        req,
        stripe,
        endpointSecret,
      });
    } catch (e) {
      console.log("ERROR IN STRIPE PAYMENT", e);
    }
    switch (event.type) {
      case "payment_intent.succeeded": {
        //move the add token logic into customer DB from api call
        //connect to mongoDB
        const client = await clientPromise;
        const db = client.db("BloggerOpenAI");

        //grab metadata for user from api call
        const paymentIntent = event.data.object;
        const auth0Id = paymentIntent.metadata.sub;

        //add credits to account
        const userProfile = await db.collection("users").updateOne(
          {
            //search for user
            auth0Id,
          },
          {
            //increase by 10 tokens
            $inc: {
              availableTokens: 10,
            },
            //if user doesn't exist -- add them
            $setOnInsert: {
              auth0Id,
            },
          },
          {
            //upsert means if no user - create & add tokens ; if user - just update tokens
            upsert: true,
          }
        );
      }
      default:
        console.log("UNHANDLED EVENT", event.type);
    }
    res.status(200).json({ received: true });
  }
};

//export handler within cors function
export default cors(handler);
