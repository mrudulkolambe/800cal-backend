const Transactions = require("../model/Transactions");


const createTransaction = async (req, res) => {
	try {
		const newTransaction = new Transactions({ ...req.body, customers: req.customer._id });
		const savedTransaction = await newTransaction.save();
		if (savedTransaction) {
			return res.json({
				error: false,
				message: "Transaction Created Successfully!",
				transaction: savedTransaction
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const getCustomerTransactions = async (req, res) => {
	try {
		const transactions = await Transactions.find({ customers: req.customer._id }).populate("customers").sort('time_stamp', 'descending')
		if (transactions) {
			return res.json({
				error: true,
				message: "Transactions fetched Successfully!",
				transactions: transactions
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

module.exports = { createTransaction, getCustomerTransactions };