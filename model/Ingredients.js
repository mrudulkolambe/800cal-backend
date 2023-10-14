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
}, {timestamps: true})


module.exports = mongoose.model('ingredients', Ingredients);