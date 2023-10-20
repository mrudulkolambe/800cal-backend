const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	code: {
		type: String,
		required: true,
		unique: true,
	},
	minimumOrderAmount: {
		type: Number,
		required: true,
		default: 0
	},
	discountPercentage: {
		type: Number,
		required: true,
		default: 0
	},
	maximumDiscount: {
		type: Number,
		required: true,
		default: 0
	},
	termsAndConditions: {
		type: String,
		required: true
	},
	date: {
		type: Number,
		required: true,
		default: Date.now()
	},
	validTill: {
		type: Number,
		required: true
	},
	active: {
		type: Boolean,
		required: true,
		default: true
	}
});

module.exports = mongoose.model("discounts", DiscountSchema);