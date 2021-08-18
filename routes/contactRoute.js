const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const contactForm = require("../controllers/contactController");


router.post("/", [check("email").isEmail(), check("message", "Message value should be more than 2").isLength({ min: 2 })], contactForm.createContact);


module.exports = router;