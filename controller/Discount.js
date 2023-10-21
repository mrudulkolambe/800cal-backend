const Discount = require("../model/Discount")

const createDiscount = async (req, res) => {
	try {
		const newDiscount = new Discount(req.body);
		const savedDiscount = await newDiscount.save();
		if (savedDiscount) {
			return res.json({
				error: false,
				message: "Discount Coupon Created Successfully!",
				coupon: savedDiscount
			})
		} else {
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
		if (discounts) {
			return res.json({
				error: false,
				message: "Discount Coupon Fetched Successfully!",
				coupons: discounts
			})
		} else {
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

const fetchDiscount = async (req, res) => {
	try {
		const coupon = await Discount.findOne({ code: req.body.code });
		if (coupon) {
			if (coupon.active && Number(req.body.amount) < coupon.minimumOrderAmount) {
				return res.json({
					error: true,
					message: `Order amount should be greater than ${coupon.minimumOrderAmount}`,
					data: undefined
				})
			} else if (!coupon.active) {
				return res.json({
					error: true,
					message: `Invalid Coupon Code`,
					data: undefined
				})
			} else {
				const discountAmount = Number(req.body.amount) * (coupon.discountPercentage/100);
				if (discountAmount > coupon.maximumDiscount) {
					return res.json({
						error: false,
						message: `Coupon Applied Successfully!`,
						data: {
							_id: coupon._id,
							discountAmount: coupon.maximumDiscount,
							code: coupon.code,
							percentage: coupon.discountPercentage
						}
					})
				} else {
					return res.json({
						error: false,
						message: `Coupon Applied Successfully!`,
						data: {
							_id: coupon._id,
							discountAmount: discountAmount,
							code: coupon.code,
							percentage: coupon.discountPercentage
						}
					})
				}
			}
		} else {
			return res.json({
				error: true,
				message: "Invalid Coupon Code",
				data: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
			data: undefined
		})
	}
}

module.exports = {
	createDiscount,
	getDiscountCoupons,
	fetchDiscount
}