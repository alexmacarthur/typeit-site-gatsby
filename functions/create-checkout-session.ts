import { Handler } from "@netlify/functions";
import * as Sentry from "@sentry/node";
import Stripe from "stripe";
import { default as headers } from "./src/constants/defaultHeaders";
import isProduction from "./src/util/isProduction";
import getLicenseData from "./src/util/getLicenseData";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});
const statusCode = 200;

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

const domain = isProduction()
  ? "https://typeitjs.com"
  : "http://localhost:8000";

const handler: Handler = async (event, _context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode,
      headers,
      body: JSON.stringify({
        message: "Not a valid request!",
      }),
    };
  }

  const slug = new URLSearchParams(event.body).get("slug");
  const licenseData = getLicenseData(slug);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: licenseData.priceId,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${domain}/confirmation/${licenseData.friendlySlug}?id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domain}/licenses/purchase`,
  });

  return {
    statusCode: 303,
    headers: {
      ...headers,
      Location: session.url,
    },
  };
};

export { handler };
