const express = require('express');
const router = express.Router();
const rider = require("../middleware/Rider");
const { CreateIngredients, ViewAllIngredients, ViewIngredientById, UpdateIngredient } = require('../controller/Ingredients');
const handleRestaurant = require('../middleware/Restaurant');

router.post("/create", handleRestaurant, CreateIngredients);

router.get('/', handleRestaurant, ViewAllIngredients);

router.get('/:_id', ViewIngredientById);

router.patch('/:_id', handleRestaurant, UpdateIngredient);

module.exports = router;