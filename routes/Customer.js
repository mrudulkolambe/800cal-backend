const express = require('express');
const { handleSignIn, handleSignup, getCustomerProfileByToken, updateCustomerByToken, getAllCustomers, resetPassword } = require('../controller/Customer');
const router = express.Router();
const customer = require("../middleware/Customer")
const { resetPasswordEmail } = require("../controller/Email")

router.post("/signup", handleSignup);

router.post('/signin', handleSignIn);

router.get('/profile', customer, getCustomerProfileByToken);

router.get('/all', getAllCustomers);

router.patch('/update', customer, updateCustomerByToken);

router.patch('/reset-password', resetPasswordEmail);



module.exports = router;