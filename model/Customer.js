const mongoose = require("mongoose");

const Customer = new mongoose.Schema({
	username: {
		type: String,
		required: true,
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
	phonenumber: {
		type: String,
		default: ""
	},
	verified: {
		type: Boolean,
		default: false,
	},
	role: {
		type: String,
		default: "customer"
	},
	firstname: {
		type: String,
		default: "",
	},
	lastname: {
		type: String,
		default: ""
	},
	dob: {
		type: Date,
		default: Date.now()
	},
	gender: {
		type: String,
		default: "male",
		enum: ["male", "female"]
	},
	weight: {
		type: Number
	},
	height: {
		type: Number
	},
	allergy: {
		type: [mongoose.SchemaTypes.ObjectId],
		ref: "ingredients"
	},
	dislikes: {
		type: [mongoose.SchemaTypes.ObjectId],
		ref: "ingredients"
	},
	image: {
		type: String,
		default: "",
	},
	address: {
		type: String,
		default: ""
	},
	balance: {
		type: Number,
		default: 0,
		required: true
	}
}, { timestamps: true })


module.exports = mongoose.model('customers', Customer);