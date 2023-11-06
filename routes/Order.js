const express = require("express");
const { createOrder, getUserOrders, getUserOrderById, getOrdersByCategory, updateOrder, riderNewOrder, assignOrder } = require("../controller/Order");
const handleCustomer = require("../middleware/Customer");
const handleRider = require("../middleware/Rider");
const router = express.Router();

router.post("/create", handleCustomer, createOrder);

router.get("/user", handleCustomer, getUserOrders);

router.get("/category/:category", getOrdersByCategory);

router.get("/user/:_id", getUserOrderById);

router.patch("/user/:_id", updateOrder);

router.get("/rider",handleRider, riderNewOrder);

router.patch("/assign/:_id",handleRider, assignOrder);

module.exports = router;