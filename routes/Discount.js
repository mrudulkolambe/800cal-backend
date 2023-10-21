const express = require("express");
const { createDiscount, getDiscountCoupons, fetchDiscount } = require("../controller/Discount");
const handleAdmin = require("../middleware/Admin");
const handleCustomer = require("../middleware/Customer");
const router = express.Router();

router.post("/create", handleAdmin, createDiscount);

router.get("/", getDiscountCoupons);

router.post("/apply-coupon", handleCustomer, fetchDiscount);

module.exports = router;