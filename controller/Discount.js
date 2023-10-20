const Discount = require("../model/Discount")

const createDiscount = async (req, res) => {
	try {
		const newDiscount = new Discount(req.body);
		const savedDiscount = await newDiscount.save();
		if(savedDiscount){
			return res.json({
				error: false,
				message: "Discount Coupon Created Successfully!",
				coupon: savedDiscount
			})
		}else{
			return res.json({
				error: true,
				message: "Something went wrong!",
				coupon: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
			coupon: undefined
		})
	}
}

const getDiscountCoupons = async (req, res) => {
	try {
		const discounts = await Discount.find();
		if(discounts){
			return res.json({
				error: false,
				message: "Discount Coupon Fetched Successfully!",
				coupons: discounts
			})
		}else{
			return res.json({
				error: true,
				message: "Something went wrong!",
				coupons: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
			coupons: undefined
		})
	}
}

module.exports = {
	createDiscount,
	getDiscountCoupons
}