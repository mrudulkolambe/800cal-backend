const express = require("express");
const { createOrder, getUserOrders, getUserOrderById, getOrdersByCategory } = require("../controller/Order");
const handleCustomer = require("../middleware/Customer");
const router = express.Router();

router.post("/create", handleCustomer, createOrder);

router.get("/user", handleCustomer, getUserOrders);

router.get("/category/:category", getOrdersByCategory);

router.get("/user/:_id", handleCustomer, getUserOrderById);

module.exports = router;