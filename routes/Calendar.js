const express = require('express');
const { createCalendarDate, getCalendarByCategory, UpdateCalendar, handleRestaurantCalendar, getCalendarByID, handleRestaurantToken, getCalendarByCustomerID } = require('../controller/Calendar');
const handleCustomer = require('../middleware/Customer');
const handleRestaurant = require('../middleware/Restaurant');
const router = express.Router();

router.post("/create", handleCustomer, createCalendarDate)

router.get("/all", getCalendarByCategory)

router.patch("/update/:_id", UpdateCalendar);

router.get("/restaurant", handleRestaurant, handleRestaurantToken);

router.get("/restaurant/:timestamp", handleRestaurant, handleRestaurantCalendar);

router.get("/order/:_id", getCalendarByID);

router.get("/order/customer/:_id", getCalendarByCustomerID);

module.exports = router;