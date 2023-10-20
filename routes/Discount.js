const express = require("express");
const { createDiscount, getDiscountCoupons } = require("../controller/Discount");
const handleAdmin = require("../middleware/Admin");
const router = express.Router();

router.post("/create", handleAdmin, createDiscount);

router.get("/", getDiscountCoupons);

module.exports = router;