const express = require('express');
const handleRestaurant = require('../middleware/Restaurant');
const { createTransaction, getRestaurantTransactions } = require('../controller/RestaurantTransaction');
const router = express.Router();

router.post("/create", handleRestaurant, createTransaction);

router.get("/restaurant", handleRestaurant, getRestaurantTransactions);

module.exports = router;