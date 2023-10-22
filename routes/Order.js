const express = require("express");
const { createOrder, getUserOrders, getUserOrderById, getNewOrders, getAllOrders } = require("../controller/Order");
const handleCustomer = require("../middleware/Customer");
const router = express.Router();

router.post("/create", handleCustomer, createOrder);

router.get("/user", handleCustomer, getUserOrders);

router.get("/all", getAllOrders);

router.get("/new", getNewOrders);

router.get("/user/:_id", handleCustomer, getUserOrderById);

module.exports = router;