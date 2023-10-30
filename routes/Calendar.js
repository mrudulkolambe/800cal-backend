const express = require('express');
const { createCalendarDate, getCalendarByCategory, UpdateCalendar, handleRestaurantCalendar } = require('../controller/Calendar');
const handleCustomer = require('../middleware/Customer');
const handleRestaurant = require('../middleware/Restaurant');
const router = express.Router();

router.post("/create", handleCustomer, createCalendarDate)

router.get("/all", getCalendarByCategory)

router.patch("/update/:_id", handleCustomer, UpdateCalendar);

router.get("/restaurant", handleRestaurant, handleRestaurantCalendar);

module.exports = router;