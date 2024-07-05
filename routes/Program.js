const express = require("express");
const { ViewAllPrograms, createProgram, UpdatePrograms, GetProgramById, searchProgram } = require("../controller/Program");
const handleAdmin = require("../middleware/Admin");
const router = express.Router();

router.get("/", ViewAllPrograms);
router.get("/search", searchProgram);

router.post("/create", handleAdmin, createProgram);

router.patch("/:_id", handleAdmin, UpdatePrograms);

router.get("/:_id", GetProgramById);

module.exports = router;