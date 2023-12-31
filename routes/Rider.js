const express = require('express');
const { handleSignIn, handleSignup, getRiderProfileByToken, updateRiderByToken, getAllRiders, getRiderInfo } = require('../controller/Rider');
const router = express.Router();
const rider = require("../middleware/Rider")
const restaurant = require("../middleware/Restaurant");

router.post("/signup", restaurant, handleSignup);

router.post('/signin', handleSignIn);

router.get('/profile', rider, getRiderProfileByToken);

router.get('/all', getAllRiders);

router.get('/info/:_id', getRiderInfo);

router.patch('/update', rider, updateRiderByToken);

module.exports = router;