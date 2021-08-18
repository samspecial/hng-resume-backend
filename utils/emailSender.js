const sgMail = require("@sendgrid/mail");
require("dotenv").config();

exports.sendEmail = async (option) => {
  const { APIKEY_SENDGRID } = process.env;
  sgMail.setApiKey(APIKEY_SENDGRID);
  const mailOptions = {
    from: option.from,
    to: option.to,
    subject: option.subject,
    text: option.text,
    html: option.html,
  };
  sgMail
    .send(mailOptions)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error.message);
    });
};
