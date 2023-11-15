const mongoose = require("mongoose")

const DetailsSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	phonenumber: {
		type: Number,
	},
	instagram: String,
	twitter: String,
	website: String,
	tiktok: String,
	snapchat: String,
	whatsapp: String,
	facebook: String,
	privacypolicy: {
		type: String
	},
	termsandconditions: {
		type: String
	},
	help: {
		type: String
	},
}, {
	timestamps: true
})

module.exports = mongoose.model("data", DetailsSchema)