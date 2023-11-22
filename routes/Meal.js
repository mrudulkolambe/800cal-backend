const express = require("express");
const { createMeal, ViewMeal, ViewMealByProgramId, updateMeal, GetMealByID } = require("../controller/Meals");
const handleAdmin = require("../middleware/Admin");
const router = express.Router();

router.get("/", ViewMeal);

router.get("/program/:_id", ViewMealByProgramId);

router.get("/:_id", GetMealByID);

router.post("/create", handleAdmin, createMeal);

router.patch("/:_id", handleAdmin, updateMeal);

module.exports = router;