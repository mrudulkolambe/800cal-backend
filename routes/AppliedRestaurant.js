const express = require('express');
const { ApplyForMeal, GetAppliedMeals, GetAppliedRestaurantAndMeal, AppliedMealApprove } = require('../controller/AppliedRestaurant');
const handleRestaurant = require("../middleware/Restaurant");
const handleAdmin = require("../middleware/Admin");
const router = express.Router();

router.post("/create", handleRestaurant, ApplyForMeal);

router.get("/", GetAppliedMeals);

router.get("/:meal", handleRestaurant, GetAppliedRestaurantAndMeal);

router.patch("/approve", handleAdmin, AppliedMealApprove);

module.exports = router;