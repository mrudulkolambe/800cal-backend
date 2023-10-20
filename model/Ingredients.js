const mongoose = require("mongoose");

const Ingredients = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	weight: {
		type: String,
	},
	protien: {
		type: String,
	},
	fat: {
		type: String,
	},
	carbs: {
		type: String,
	},
	calories: {
		type: String,
	},
}, {timestamps: true})


module.exports = mongoose.model('ingredients', Ingredients);