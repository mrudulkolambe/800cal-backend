const mongoose = require("mongoose");

const Admin = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Please provide username'],
		unique: true,
		trim: true
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
	role: {
		type: String,
		default: "admin"
	},
	firstname: {
		type: String,
	},
	lastname: {
		type: String
	},
}, { timestamps: true })


module.exports = mongoose.model('admins', Admin);