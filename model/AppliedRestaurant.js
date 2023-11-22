const mongoose = require("mongoose");

const AppliedRestaurant = new mongoose.Schema({
	timestamp: {
		type: Number,
		required: true,
		default: Date.now()
	},
	restaurant: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "restaurants",
		required: true
	},
	meal: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "meals",
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	approved: {
		type: Boolean,
		default: false
	}
}, { timestamps: true });

module.exports = mongoose.model("appliedrestaurants", AppliedRestaurant)