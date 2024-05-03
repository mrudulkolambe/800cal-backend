const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
	customers: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "customers",
		required: true
	},
	order:{
		type: mongoose.SchemaTypes.ObjectId,
		ref: "meals"
	},
	time_stamp: {
		type: Number,
		default: Date.now(),
		required: true
	},
	description: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		default: "new"
	}
})

module.exports = mongoose.model('tickets', TicketSchema);