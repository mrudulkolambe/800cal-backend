const express = require('express');
const { createCalendarDate } = require('../controller/Calendar');
const handleCustomer = require('../middleware/Customer');
const router = express.Router();

router.post("/create",handleCustomer, createCalendarDate)
// router.post("/create",handleCustomer, createCalendarDate)

module.exports = router;