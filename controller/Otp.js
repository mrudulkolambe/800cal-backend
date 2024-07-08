const OTP = require("../model/Otp");
const bcrypt = require("bcryptjs");
const sendOTP = require("../utils/sendOtp");

const generateOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: true, message: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const hashedOTP = await bcrypt.hash(otp, 10);

  await OTP.findOneAndUpdate(
    { email },
    { otp: hashedOTP },
    { upsert: true, new: true }
  );

  await sendOTP(email, otp);

  res.json({ error: false, message: "OTP sent successfully" });
};

const validateOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ error: true, message: "Email and OTP are required" });
  }

  const otpRecord = await OTP.findOne({ email });

  if (!otpRecord) {
    return res.status(400).json({ error: true, message: "Invalid OTP" });
  }

  const isValid = await bcrypt.compare(otp, otpRecord.otp);

  if (!isValid) {
    return res.status(400).json({ error: true, message: "Invalid OTP" });
  }

  // OTP is valid, proceed with registration or other processes
  await OTP.deleteOne({ email });

  res.json({ error: false, message: "OTP validated successfully" });
};

module.exports = { generateOtp, validateOtp };
