const mongoose = require("mongoose");

const RestaurantTransactionSchema = new mongoose.Schema({
	restaurant: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "restaurants",
		required: true
	},
	amount: {
		type: Number,
		default: 0,
		required: true
	},
	time_stamp: {
		type: Number,
		default: Date.now(),
		required: true
	},
	description: {
		type: String,
		required: true,
	},
	approved: {
		type: Boolean,
		default: false,
		required: true
	},
	completed: {
		type: Boolean,
		required: true,
		default: false
	}
})

module.exports = mongoose.model('restaurant-transactions', RestaurantTransactionSchema);