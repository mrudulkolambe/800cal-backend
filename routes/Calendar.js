const express = require('express');
const { createCalendarDate, getCalendarByCategory } = require('../controller/Calendar');
const handleCustomer = require('../middleware/Customer');
const router = express.Router();

router.post("/create",handleCustomer, createCalendarDate)

router.get("/all", getCalendarByCategory)

module.exports = router;