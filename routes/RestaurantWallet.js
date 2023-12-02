const express = require('express');
const handleRestaurant = require('../middleware/Restaurant');
const { createTransaction, getRestaurantTransactions, approveTransaction } = require('../controller/RestaurantTransaction');
const router = express.Router();

router.post("/create", handleRestaurant, createTransaction);

router.get("/restaurant", handleRestaurant, getRestaurantTransactions);

router.patch("/approve/:_id", approveTransaction);

module.exports = router;