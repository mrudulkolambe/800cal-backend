const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
	customers: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "customers",
		required: true
	},
	amount: {
		type: Number,
		default: 0,
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
	}
})

module.exports = mongoose.model('tickets', TicketSchema);