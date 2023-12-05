const express = require('express');
const handleRestaurant = require('../middleware/Restaurant');
const { createTransaction, getRestaurantTransactions, approveTransaction, getTransactions } = require('../controller/RestaurantTransaction');
const router = express.Router();

router.post("/create", createTransaction);

router.get("/restaurant", handleRestaurant, getRestaurantTransactions);

router.get("/all", getTransactions);

router.patch("/approve/:_id", approveTransaction);

module.exports = router;