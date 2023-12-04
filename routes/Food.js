const express = require('express');
const { CreateFood, GetFoodByID, GetFoodByRestaurant, GetAllFood, GetFoodByRestaurantID, UpdateById } = require('../controller/Food');
const router = express.Router();
const restaurant = require("../middleware/Restaurant");

router.post("/create", restaurant, CreateFood);

router.get('/:_id', GetFoodByID);

router.get('/restaurant/token', restaurant, GetFoodByRestaurant);

router.get('/restaurant/id', GetFoodByRestaurantID);

router.get('/all', GetAllFood);

router.patch('/:_id', restaurant, UpdateById);


module.exports = router;