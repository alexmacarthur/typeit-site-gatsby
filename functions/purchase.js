require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const hasRequiredProperties = require("./src/util/hasRequiredProperties");
const getLicenseData = require("./src/util/getLicenseData");
const sendEmails = require("./src/util/sendEmails");
const Sentry = require('@sentry/node');

const isProduction = process.env.NODE_ENV === "production";

const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin": isProduction ? "https://typeitjs.com" : "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

Sentry.init({
  dsn: process.env.SENTRY_DSN
});

exports.handler = async function (event) {
  if (event.httpMethod !== "POST" || !event.body) {
    return {
      statusCode,
      headers,
      body: JSON.stringify({
        message: "Not a valid request!"
      })
    };
  }

  const data = JSON.parse(event.body);
  let charge = {};

  if (!hasRequiredProperties(data)) {
    Sentry.captureMessage("The request is missing data.", "error");

    return {
      statusCode,
      headers,
      body: JSON.stringify({
        message: "The request is missing data."
      })
    };
  }

  // Get the data for the particular license being purchased.
  const licenseData = getLicenseData(data.slug);

  const {
    simpleTitle,
    price
  } = licenseData;

  try {
    const customer = await stripe.customers.create(
      {
        email: data.emailAddress,
        source: data.source.id,
        description: 'Purchased a license for TypeIt.',
      }
    );

    charge = await stripe.charges.create(
      {
        amount: price,
        currency: "usd",
        receipt_email: data.emailAddress,
        description: `TypeIt - ${simpleTitle}`,
        statement_descriptor: "A. MacArthur - TypeIt",
        customer: customer.id
      },
      {
        idempotencyKey: data.idempotencyKey
      }
    );
  } catch (e) {
    console.error(`${data.emailAddress} -- ${e.message}`);
    Sentry.captureException(e);

    return {
      statusCode,
      headers,
      body: JSON.stringify({
        message: e.message
      })
    };
  }

  await sendEmails({ data, licenseData, charge });

  return {
    statusCode,
    headers,
    body: JSON.stringify({
      id: charge.id,
      chargeStatus: charge.status,
      amount: price,
      message: "Request complete."
    })
  };
};
