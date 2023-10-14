const express = require("express");
const { createMeal, ViewMeal, ViewMealByProgramId } = require("../controller/Meals");
const handleAdmin = require("../middleware/Admin");
const router = express.Router();

router.get("/", ViewMeal);

router.get("/:_id", ViewMealByProgramId);

router.post("/create", handleAdmin, createMeal);

// router.patch("/:_id", handleAdmin, UpdatePrograms);

module.exports = router;