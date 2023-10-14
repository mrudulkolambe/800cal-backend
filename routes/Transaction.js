const express = require('express');
const handleCustomer = require('../middleware/Customer');
const { createTransaction, getCustomerTransactions } = require('../controller/Transaction');
const router = express.Router();

router.post("/create", handleCustomer, createTransaction);

router.get("/customer", handleCustomer, getCustomerTransactions);

module.exports = router;