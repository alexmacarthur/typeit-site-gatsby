const ejs = require("ejs");
const emailTemplate = require("../email");
const showdown = require("showdown");
const nodemailer = require("nodemailer");
const markdownConverter = new showdown.Converter();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MY_EMAIL_ADDRESS,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const transport = (options) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(options, function (error, info) {
      if (error) {
        return reject(error);
      }

      return resolve(info.response);
    });
  });
};

module.exports = async ({ data, licenseData, charge }) => {
  let { simpleTitle, permissionDescription, licenseLink } = licenseData;

  let emailContent = ejs.render(
    emailTemplate,
    {
      simpleTitle,
      permissionDescription,
      licenseLink,
    },
    {}
  );

  emailContent = markdownConverter.makeHtml(emailContent);

  try {
    const clientEmailPromise = transport({
      to: data.emailAddress,
      from: process.env.MY_EMAIL_ADDRESS,
      subject: "TypeIt - License & Instructions",
      html: emailContent,
    });

    const personalEmailPromise = transport({
      to: process.env.MY_EMAIL_ADDRESS,
      from: process.env.MY_EMAIL_ADDRESS,
      subject: `${simpleTitle} Purchased!`,
      html: `
        Email Address: ${data.emailAddress}
        <br>
        Stripe Link: https://dashboard.stripe.com/payments/${charge.id}
      `,
    });

    await Promise.all([clientEmailPromise, personalEmailPromise]);
  } catch (e) {
    console.error(e.message);
    Sentry.captureException(e);
  }
};
