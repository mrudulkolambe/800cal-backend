const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Food = require('../model/Food');


const CreateFood = async (req, res) => {
	try {
		const newFood = new Food({ ...req.body, restaurant: req.restaurant._id });
		const savedFood = await newFood.save();
		if (savedFood) {
			return res.json({
				error: false,
				message: "Food Created Successfully!",
				food: savedFood
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

const GetFoodByID = async (req, res) => {
	try {
		const food = await Food.findById(req.params._id).populate("ingredients").populate("restaurant", { password: 0 });
		if (food) {
			return res.json({
				error: false,
				message: "Food fetched Successfully!",
				food: food
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				food: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
			food: undefined
		})
	}
}
const GetFoodByRestaurant = async (req, res) => {
	try {
		const food = await Food.find({restaurant: req.restaurant._id}).populate("ingredients").populate("restaurant", { password: 0 });
		if (food) {
			return res.json({
				error: false,
				message: "Food fetched Successfully!",
				food: food
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				food: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
			food: undefined
		})
	}
}

const GetFoodByRestaurantID = async (req, res) => {
	try {
		const food = await Food.find({restaurant: req.params._id}).populate("ingredients").populate("restaurant", { password: 0 });
		if (food) {
			return res.json({
				error: false,
				message: "Food fetched Successfully!",
				food: food
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				food: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
			food: undefined
		})
	}
}

const GetAllFood = async (req, res) => {
	try {
		const food = await Food.find({}).populate("ingredients").populate("restaurant", { password: 0 });
		if (food) {
			return res.json({
				error: false,
				message: "Food fetched Successfully!",
				food: food
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				food: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
			food: undefined
		})
	}
}

// const GetRestaurantById = async (req, res) => {
// 	try {
// 		const category = await RestoCategory.findById(req.params._id);
// 		const restaurants = await Restaurant.find({ category: category._id }).populate("category");
// 		if (category) {
// 			return res.json({
// 				error: false,
// 				message: "Category fetched Successfully!",
// 				data: { price: category.price, restaurants }
// 			})
// 		} else {
// 			return res.json({
// 				error: true,
// 				message: "Something went wrong!",
// 				data: undefined
// 			})
// 		}
// 	} catch (error) {
// 		return res.json({
// 			error: true,
// 			message: error.message,
// 			data: undefined
// 		})
// 	}
// }

// const updateAdminByToken = async (req, res) => {
// 	try {
// 		const { _id } = req.admin;
// 		const admin = await Admin.findByIdAndUpdate(_id, req.body, {
// 			returnOriginal: false
// 		})
// 		if (admin) {
// 			return res.json({
// 				error: false,
// 				message: "Profile Updated Successfully",
// 				admin
// 			})
// 		} else {
// 			return res.json({
// 				error: true,
// 				message: "Something went wrong!",
// 			})
// 		}
// 	} catch (error) {
// 		return res.json({
// 			error: true,
// 			message: error.message,
// 		})
// 	}
// }

module.exports = { CreateFood, GetFoodByID, GetFoodByRestaurant, GetAllFood, GetFoodByRestaurantID };