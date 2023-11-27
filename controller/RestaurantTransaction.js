const RestaurantWallet = require("../model/RestaurantWallet");
const Restaurant = require("../model/Restaurant");


const createTransaction = async (req, res) => {
	try {
		const user = await Restaurant.findByIdAndUpdate(req.restaurant._id, { $inc: { wallet: req.body.amount } }, {
			returnOriginal: false
		})
		console.log(user)
		const newTransaction = await new RestaurantWallet({ ...req.body, restaurant: user._id });
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

const getRestaurantTransactions = async (req, res) => {
	try {
		const transactions = await RestaurantWallet.find({ restaurant: req.restaurant._id }).populate("restaurant").sort({ 'time_stamp': -1 })
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

module.exports = { createTransaction, getRestaurantTransactions };