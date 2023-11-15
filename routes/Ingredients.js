const express = require('express');
const router = express.Router();
const rider = require("../middleware/Rider");
const { CreateIngredients, ViewAllIngredients } = require('../controller/Ingredients');
const handleRestaurant = require('../middleware/Restaurant');

router.post("/create", handleRestaurant, CreateIngredients);

router.get('/', handleRestaurant, ViewAllIngredients);

module.exports = router;