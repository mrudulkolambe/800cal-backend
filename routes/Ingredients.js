const express = require('express');
const router = express.Router();
const rider = require("../middleware/Rider");
const { CreateIngredients, ViewAllIngredients } = require('../controller/Ingredients');

router.post("/create", CreateIngredients);

router.get('/', ViewAllIngredients);

module.exports = router;