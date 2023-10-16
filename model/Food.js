const mongoose = require("mongoose");

const Food = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true
	},
	restaurant: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "restaurants",
		required: true
	},
	badge: {
		type: String
	},
	ingredients: {
		type: [mongoose.SchemaTypes.ObjectId],
		ref: "ingredients",
		required: true
	},
	protien: {
		type: String,
		required: true
	},
	fat: {
		type: String,
		required: true
	},
	carbs: {
		type: String,
		required: true
	},
	calories: {
		type: String,
		required: true
	},
	popular: {
		type: Boolean,
		default: false
	},
	category: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true,
		default: ""
	}
}, { timestamps: true })


module.exports = mongoose.model('food', Food);