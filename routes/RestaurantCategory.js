const express = require('express');
const router = express.Router();
const { CreateCategory, GetParticularCategory, GetRestaurantById } = require('../controller/RestoCategory');

router.post("/create", CreateCategory);

router.get("/:_id", GetParticularCategory);

router.get("/restaurant/:_id", GetRestaurantById);


module.exports = router;