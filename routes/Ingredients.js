const express = require('express');
const router = express.Router();
const rider = require("../middleware/Rider");
const { CreateIngredients, ViewAllIngredients, ViewIngredientById, UpdateIngredient, CreateAdminIngredients } = require('../controller/Ingredients');
const handleRestaurant = require('../middleware/Restaurant');

router.post("/create", handleRestaurant, CreateIngredients);

router.post("/admin/create", CreateAdminIngredients);

router.get('/', ViewAllIngredients);

router.get('/:_id', ViewIngredientById);

router.patch('/:_id', UpdateIngredient);

module.exports = router;