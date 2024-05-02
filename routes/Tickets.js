const express = require("express");
const handleCustomer = require("../middleware/Customer");
const { createTicket, getTickets, getTicket, updateTicket } = require("../controller/Ticket");
const handleAdmin = require("../middleware/Admin");
const router = express.Router();


router.post("/create", handleCustomer, createTicket);

router.get("/", handleAdmin, getTickets)

router.get("/:_id", handleAdmin, getTicket)

router.patch("/:_id", handleAdmin, updateTicket)

module.exports = router;