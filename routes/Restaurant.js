const express = require('express');
const { handleSignIn, handleSignup, getRestaurantProfileByToken, updateRestaurantByToken, getAllRestaurants, enableRestaurant, suspendRestaurant, getRestaurantDetails, getRestaurantsByGroup, updateRestaurant, searchRestaurants } = require('../controller/Restaurant');
const router = express.Router();
const restaurant = require('../middleware/Restaurant')
const admin = require('../middleware/Admin')

router.post("/signup", handleSignup);

router.post('/signin', handleSignIn);

router.get('/profile', restaurant, getRestaurantProfileByToken);

router.get('/profile/:_id', getRestaurantDetails);

router.get('/all', getAllRestaurants);

router.get('/search', searchRestaurants);

router.get('/group', getRestaurantsByGroup);

router.patch('/update', restaurant, updateRestaurantByToken);
router.patch('/admin/update/:_id', admin, updateRestaurant);

router.patch('/enable', admin, enableRestaurant);

router.patch('/suspend', admin, suspendRestaurant);

module.exports = router;