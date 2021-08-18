const mongoose = require("mongoose");
const validator = require("validator");
const projectSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide your firstname"],
    trim: true,
    maxLength: [30, "firstname cannot exceed 30 characters long"],
    minLength: [2, "firstname cannot be lesser than 2 characters long"],
  },
  lastname: {
    type: String,
    required: [true, "Please provide your lastname"],
    trim: true,
    maxLength: [30, "lastname cannot exceed 30 characters long"],
    minLength: [2, "lastname cannot be lesser than 2 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  message: {
    type: String,
    required: [true, "Please provide message body"],
    trim: true,
    maxLength: [350, "Message cannot exceed 350 characters long"],
  },
  subject: {
    type: String,
    required: [true, "Please provide a subject"],
    trim: true,
    maxLength: [100, "Subject cannot exceed 100 characters long"],
  },
});

module.exports = mongoose.model("Project", projectSchema);
