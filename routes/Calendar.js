const express = require('express');
const { createCalendarDate, getCalendarByCategory, UpdateCalendar } = require('../controller/Calendar');
const handleCustomer = require('../middleware/Customer');
const router = express.Router();

router.post("/create", handleCustomer, createCalendarDate)

router.get("/all", getCalendarByCategory)

router.patch("/update/:_id", handleCustomer, UpdateCalendar)

module.exports = router;