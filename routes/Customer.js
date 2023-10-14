const express = require('express');
const { handleSignIn, handleSignup, getCustomerProfileByToken, updateCustomerByToken, getAllCustomers } = require('../controller/Customer');
const router = express.Router();
const customer = require("../middleware/Customer")

router.post("/signup", handleSignup);

router.post('/signin', handleSignIn);

router.get('/profile', customer, getCustomerProfileByToken);

router.get('/all', getAllCustomers);

router.patch('/update', customer, updateCustomerByToken);



module.exports = router;