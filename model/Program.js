const mongoose = require('mongoose');

const Program = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	logo: {
		type: String,
		required: true
	},
	description: {
		type: String,
	},
	tag: {
		type: String
	},
	rating: {
		type: Number,
		enum: [1, 2, 3, 4, 5]
	},
	disabled: {
		type: Boolean,
		default: false
	},
	popular: {
		type: Boolean,
		default: false
	},
	kcal: {
		type: String,
	}
}, { timestamps: true })

module.exports = mongoose.model('programs', Program);