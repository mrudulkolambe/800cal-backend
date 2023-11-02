const mongoose = require("mongoose");

const Rider = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please provide username'],
		unique: true,
		trim: true
	},
	image: {
		type: String,
		default: ""
	},
	email: {
		type: String,
		unique: [true, "Email address should be unique."],
		trim: true,
		required: true
	},
	password: {
		type: String,
		required: [true, "Password is required."]
	},
	restaurant: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "restaurants",
		required: true
	},
	role: {
		type: String,
		default: "rider"
	},
	firstname: {
		type: String,
	},
	lastname: {
		type: String
	},
	phonenumber: {
		type: String,
		required: true
	},
	civilID: {
		type: String,
	},
	licenseNo: {
		type: String
	}
}, { timestamps: true })


module.exports = mongoose.model('riders', Rider);