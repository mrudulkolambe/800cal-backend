const express = require("express");
const { createOrder, getUserOrders, getUserOrderById, getOrdersByCategory, updateOrder, riderNewOrder, assignOrder, riderOrders, getUserSubscriptionsById } = require("../controller/Order");
const handleCustomer = require("../middleware/Customer");
const handleRider = require("../middleware/Rider");
const router = express.Router();

router.post("/create", handleCustomer, createOrder);

router.get("/user", handleCustomer, getUserOrders);

router.get("/category/:category", getOrdersByCategory);

router.get("/user/:_id", getUserOrderById);

router.get("/user/subscription/:_id", getUserSubscriptionsById);

router.patch("/user/:_id", updateOrder);

router.get("/rider/active", handleRider, riderNewOrder);

router.get("/rider", handleRider, riderOrders);

router.patch("/assign/:_id", assignOrder);

module.exports = router;