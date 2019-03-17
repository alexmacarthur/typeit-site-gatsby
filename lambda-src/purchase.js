require("dotenv").config();

const licenseOptions = require("../licenseOptions");
const ejs = require("ejs");
const sgMail = require("@sendgrid/mail");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const emailTemplate = require("./src/email.js");
const showdown = require("showdown");
const markdownConverter = new showdown.Converter();
const Sentry = require('@sentry/node');

const statusCode = 200;
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type"
};

Sentry.init({ 
  dsn: process.env.SENTRY_DSN
});
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const REQUIRED_PROPERTIES = ["emailAddress", "token", "idempotencyKey", "slug"];

/**
 * Given an object, ensure that every required key exists on it.
 *
 * @param {object} data
 * @return {boolean}
 */
const hasRequiredProperties = data => {
  return REQUIRED_PROPERTIES.every(property => {
    return data[property] !== undefined;
  });
};

exports.handler = async function(event) {
  
  if (event.httpMethod !== "POST" || !event.body) {
    return {
      statusCode,
      headers,
      body: ""
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
  const licenseData = licenseOptions.find(option => {
    return option.slug === data.slug;
  });

  const {
    simpleTitle,
    permissionDescription,
    licenseLink,
    price
  } = licenseData;

  try {
    charge = await stripe.charges.create(
      {
        amount: price,
        currency: "usd",
        source: data.token.id,
        receipt_email: data.emailAddress,
        description: `TypeIt - ${simpleTitle}`,
        statement_descriptor: "A. MacArthur - TypeIt"
      },
      {
        idempotency_key: data.idempotencyKey
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

  let emailContent = ejs.render(
    emailTemplate,
    {
      simpleTitle,
      permissionDescription,
      licenseLink
    },
    {}
  );
  
  emailContent = markdownConverter.makeHtml(emailContent);

  try {
    let clientEmailPromise = sgMail.send({
      to: data.emailAddress,
      from: "alex@macarthur.me",
      subject: "TypeIt - License & Instructions",
      html: emailContent
    });

    let personalEmailPromise = await sgMail.send({
      to: "alex@macarthur.me",
      from: "alex@macarthur.me",
      subject: `${simpleTitle} Purchased!`,
      html: `
        Email Address: ${data.emailAddress}
        <br>
        Stripe Link: https://dashboard.stripe.com/payments/${charge.id}
      `
    });

    await Promise.all([clientEmailPromise, personalEmailPromise]);
  } catch (e) {
    console.error(e.message);
    Sentry.captureException(e);
  }

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
