const express = require('express');
const { ApplyForMeal, GetAppliedMeals, GetAppliedRestaurantAndMeal } = require('../controller/AppliedRestaurant');
const handleRestaurant = require("../middleware/Restaurant");
const router = express.Router();

router.post("/create", handleRestaurant, ApplyForMeal);

router.get("/", GetAppliedMeals);

router.get("/:meal", handleRestaurant, GetAppliedRestaurantAndMeal);

module.exports = router;