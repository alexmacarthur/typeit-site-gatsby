const ejs = require("ejs");
const emailTemplate = require("../email");
const sgMail = require("@sendgrid/mail");
const showdown = require("showdown");
const markdownConverter = new showdown.Converter();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async ({ data, licenseData, charge }) => {

    let {
        simpleTitle, 
        permissionDescription, 
        licenseLink
    } = licenseData;

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
    
        let personalEmailPromise = sgMail.send({
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
}
