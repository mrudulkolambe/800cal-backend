const express = require("express");
const { ViewAllPrograms, createProgram, UpdatePrograms } = require("../controller/Program");
const handleAdmin = require("../middleware/Admin");
const router = express.Router();

router.get("/", ViewAllPrograms);

router.post("/create", handleAdmin, createProgram);

router.patch("/:_id", handleAdmin, UpdatePrograms);

module.exports = router;