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
    const msg = {
      from: email,
      to: "psalmueloye@gmail.com",
      subject: subject,
    };
    await contact.save();
    sendEmail(msg);

    res.status(201).json({
      message: "Message successfully sent.",
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Server error",
    });
  }
};
