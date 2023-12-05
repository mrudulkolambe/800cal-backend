const express = require('express');
const { handleSignIn, handleSignup, getRiderProfileByToken, updateRiderByToken, getAllRiders, getRiderInfo, updateRiderByAdmin } = require('../controller/Rider');
const router = express.Router();
const rider = require("../middleware/Rider")
const restaurant = require("../middleware/Restaurant");

router.post("/signup", handleSignup);

router.post('/signin', handleSignIn);

router.get('/profile', rider, getRiderProfileByToken);

router.get('/all', getAllRiders);

router.get('/info/:_id', getRiderInfo);

router.patch('/update', rider, updateRiderByToken);

router.patch('/admin/update/:_id', updateRiderByAdmin);

module.exports = router;