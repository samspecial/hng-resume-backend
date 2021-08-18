const Contact = require("../models/contact");
const { validationResult } = require("express-validator");

exports.createContact = (req, res, next) => {
  const { email, message } = req.body;
  const contact = new Contact({
    email,
    message,
  });
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: errors.array()[0].msg,
    });
  }
  contact
    .save()
    .then(() => {
      res.status(201).json({
        message: "Message successfully sent.",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
      });
    });
};
