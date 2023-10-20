const mongoose = require('mongoose');

const Meals = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide title"],
	},
	logo: {
		type: String,
		required: [true, "Please provide logo"]
	},
	tags: {
		type: [String]
	},
	description: {
		type: [String],
	},
	rating: {
		type: Number,
		enum: [1, 2, 3, 4, 5]
	},
	program: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "programs",
		required: true
	},
	kcal: {
		type: String,
	}
}, { timestamps: true })

module.exports = mongoose.model('meals', Meals);

// MACRO<obj> = { title: "Protein", value: 30, unit: "gm"  }