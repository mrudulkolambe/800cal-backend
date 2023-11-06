const mongoose = require("mongoose");

const RestaurantMealSchema = new mongoose.Schema({
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
		default: 0,
		required: true
	}
}, { timestamps: true });

module.exports = mongoose.model("restaurant_meals", RestaurantMealSchema);