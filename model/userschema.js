const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 4,
    maxlength: 200,
    required: true,
    unique: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  creatAT: { type: String, default: new Date().getDate() },
});
module.exports = mongoose.model("users", userschema);
