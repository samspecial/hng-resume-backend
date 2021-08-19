const Contact = require("../models/contact");
const { validationResult } = require("express-validator");
const { sendEmail } = require("../utils/emailSender");

exports.createContact = async (req, res, next) => {
  try {
    const { firstname, lastname, email, message, subject } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: errors.array()[0].msg,
      });
    }

    const contact = new Contact({
      firstname,
      lastname,
      email,
      message,
      subject,
    });

    const contactFormEmail = {
      from: "psalmueloye@gmail.com",
      to: email,
      subject,
      html: `<h3>Hello ${firstname}</h3>
          <p>Your email was well received and I am excited to work with you on your next project.</p>
          <p>Kindly note that you would be contacted shortly for further discussion on how we can get started.<br>
          I am glad to start this journey with you.
          </p>
      
          <p>Regards, <br>
          Samuel Osinloye
          </p>
          
          `,
    };

    const notificationEmail = {
      from: "psalmueloye@gmail.com",
      to: "talktopsalm@gmail.com",
      subject,
      html: `<h3>Hello Samuel</h3>
            <p>${firstname} ${lastname} with the email: ${email} just filled your enquiry form with ${subject}</p>
            <p>Here is the body of the mail: <br>
            ${message}
            </p>
            
              `,
    };
    await contact.save();
    sendEmail(contactFormEmail);
    sendEmail(notificationEmail);

    res.status(201).json({
      message: "Message successfully sent. kndly check your mail",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Server error",
    });
  }
};
