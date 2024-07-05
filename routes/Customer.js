const express = require("express");
const {
  handleSignIn,
  handleSignup,
  getCustomerProfileByToken,
  updateCustomerByToken,
  getAllCustomers,
  resetPassword,
  deleteAccountByToken,
} = require("../controller/Customer");
const router = express.Router();
const customer = require("../middleware/Customer");
const { resetPasswordEmail } = require("../controller/Email");

router.post("/signup", handleSignup);

router.post("/signin", handleSignIn);

router.get("/profile", customer, getCustomerProfileByToken);
router.delete("/delete-account", customer, deleteAccountByToken);

router.get("/all", getAllCustomers);

router.patch("/update", customer, updateCustomerByToken);

router.patch("/forget-password", resetPasswordEmail);
router.patch("/reset-password", customer, resetPassword);

module.exports = router;
