const mongoose = require('mongoose');

const RestaurantCategory = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
}, { timestamps: true })

module.exports = mongoose.model('resto-category', RestaurantCategory);