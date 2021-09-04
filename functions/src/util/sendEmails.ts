import ejs from "ejs";
import emailTemplate from "../constants/email";
import showdown from "showdown";
import nodemailer from "nodemailer";
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

export default async ({ emailAddress, licenseData, paymentId }) => {
  let { simpleTitle, permissionDescription, licenseLink } = licenseData;

  let emailContent = await ejs.render(
    emailTemplate,
    {
      simpleTitle,
      permissionDescription,
      licenseLink,
    },
    {}
  );

  emailContent = markdownConverter.makeHtml(emailContent);

  const clientEmailPromise = transport({
    to: emailAddress,
    from: process.env.MY_EMAIL_ADDRESS,
    subject: "TypeIt - License & Instructions",
    html: emailContent,
  });

  const personalEmailPromise = transport({
    to: process.env.MY_EMAIL_ADDRESS,
    from: process.env.MY_EMAIL_ADDRESS,
    subject: `${simpleTitle} Purchased!`,
    html: `
      Email Address: ${emailAddress}
      <br>
      Stripe Link: https://dashboard.stripe.com/payments/${paymentId}
    `,
  });

  await Promise.all([clientEmailPromise, personalEmailPromise]);
};
