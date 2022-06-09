import { Handler } from "@netlify/functions";
import { License } from "./types";

import getLicenseData from "./src/util/getLicenseData";
import * as Sentry from "@sentry/node";
import Stripe from "stripe";
import sendEmails from "./src/util/sendEmails";
import { default as headers } from "./src/constants/defaultHeaders";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});

const handler: Handler = async (event, _context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Not a valid request!",
      }),
    };
  }

  const sig = event.headers["stripe-signature"];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    Sentry.captureException(err);
    console.error(err.message);

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        message: `Webhook Error: ${err.message}`,
      }),
    };
  }

  if (stripeEvent.type !== "checkout.session.completed") {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        message: "Not a checkout.session.completed event.",
      }),
    };
  }

  const sessionData = stripeEvent.data.object;
  const session = await stripe.checkout.sessions.retrieve(sessionData.id, {
    expand: ["line_items"],
  });
  const customer = (await stripe.customers.retrieve(
    sessionData.customer
  )) as any;

  for (const item of session.line_items.data) {
    const productId = item.price.product as string;
    const product = await stripe.products.retrieve(productId);
    const slug = product.metadata.slug;
    const licenseData: License = getLicenseData(slug);

    try {
      await sendEmails({
        emailAddress: customer.email,
        licenseData,
        paymentId: sessionData.payment_intent,
      });
    } catch (err) {
      Sentry.captureException(err);
      console.error(err.message);

      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          message: err.message,
        }),
      };
    }
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: "We good.",
    }),
  };
};

export { handler };
