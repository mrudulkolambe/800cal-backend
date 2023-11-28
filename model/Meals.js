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
	// tag: {
	// 	type: String
	// },
	description: {
		type: String,
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
	},
	disabled: {
		type: Boolean,
		default: true,
		required: true
	},
	meals: {
		type: [Map],
		required: true
	},
	silverprice: {
		type: Number,
		default: 0,
		required: true
	},
	goldprice: {
		type: Number,
		default: 0,
		required: true
	},
	platinumprice: {
		type: Number,
		default: 0,
		required: true
	},
	published: {
		type: Boolean,
		default: false,
		required: true
	},
}, { timestamps: true })

module.exports = mongoose.model('meals', Meals);