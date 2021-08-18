const express = require("express");
const app = express();
require("dotenv").config();

const cors = require("cors");
const mongoose = require("mongoose");
const contact = require("./routes/contactRoute");

mongoose
  .connect(process.env.MONGO_URI, {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to Mongo Atlas");
  })
  .catch((error) => {
    console.log("Unable to connect to Mongo Atlas");
    console.error(error);
  });

app.use(express.json());
app.use(cors());

app.use("/contact", contact);

app.use((req, res) => {
  res.json({
    message: "Your request was successful",
  });
});

module.exports = app;
