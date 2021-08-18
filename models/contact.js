const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    email: { type: String, required: true },
    message:{type:String, required:true}
})

module.exports = mongoose.model("Contact", contactSchema);