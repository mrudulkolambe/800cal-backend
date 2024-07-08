const express = require("express");
const {
  handleSignIn,
  handleSignup,
  getCustomerProfileByToken,
  updateCustomerByToken,
  getCustomers,
  resetPassword,
  deleteAccountByToken,
  handleOtpSignup,
} = require("../controller/Customer");
const router = express.Router();
const customer = require("../middleware/Customer");
const { resetPasswordEmail } = require("../controller/Email");

router.post("/signup", handleOtpSignup);

router.post("/signin", handleSignIn);

router.get("/profile", customer, getCustomerProfileByToken);

router.get("/:query", getCustomers);

router.patch("/update", customer, updateCustomerByToken);

router.patch("/forget-password", resetPasswordEmail);
router.patch("/reset-password", customer, resetPassword);

router.delete("/delete-account", customer, deleteAccountByToken);

module.exports = router;
