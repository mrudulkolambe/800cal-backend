const mongoose = require('mongoose');

const Restaurant = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	logo: {
		type: String,
		// required: true
	},
	description: {
		type: String,
		default: ""
	},
	backgroundImg: {
		type: String
	},
	tags: {
		type: [String]
	},
	username: {
		type: String,
		unique: true,
		required: [true, "Please provide username"],
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	verified: {
		type: Boolean,
		default: false
	},
	role: {
		type: String,
		default: "restaurant"
	},
	closed: {
		type: Boolean,
		default: false
	},
	enabled: {
		type: Boolean,
		default: false
	},
	// category: {
	// 	type: mongoose.SchemaTypes.ObjectId,
	// 	ref: "resto-category",
	// 	required: true
	// },
	rating: {
		type: Number,
		enum: [1, 2, 3, 4, 5],
		default: 4
	},
	image: {
		type: String,
	},
	ownername: {
		type: String
	},
	ownernumber: {
		type: String
	},
	owneremail: {
		type: String
	},
	managername: {
		type: String
	},
	managernumber: {
		type: String
	},
	manageremail: {
		type: String
	},
	contactname: {
		type: String
	},
	contactnumber: {
		type: String
	},
	contactemail: {
		type: String
	},
	ordersCanAccept: {
		type: Number,
		default: 0
	},
	wallet: {
		type: Number,
		required: true,
		default: 0
	},
	licenseExpiry: {
		type: Number,
		default: 0
	},
	license: {
		type: String,
		default: ""
	},
	agreement: {
		type: String,
		required: false
	},
	companyname: {
		type: String,
		default: ""
	}
}, { timestamps: true })

module.exports = mongoose.model('restaurants', Restaurant);