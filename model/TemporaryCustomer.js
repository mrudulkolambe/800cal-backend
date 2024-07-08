const mongoose = require("mongoose");

const TemporaryCustomerSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  phonenumber: String,
  firstname: String,
  lastname: String,
  address: String,
  otp: String,
  otpExpiresAt: Date,
});

module.exports = mongoose.model("TemporaryCustomer", TemporaryCustomerSchema);
