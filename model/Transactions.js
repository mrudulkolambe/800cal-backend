const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
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
	debited: {
		type: Boolean,
		required: true
	},
	time_stamp: {
		type: Number,
		default: Date.now(),
		required: true
	},
	description: {
		type: String,
		required: true,
	}
})

module.exports = mongoose.model('transactions', TransactionSchema);