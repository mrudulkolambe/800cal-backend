const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const RestoCategory = require("../model/RestaurantCategory");
const Restaurant = require('../model/Restaurant');


const CreateCategory = async (req, res) => {
	try {
		const newcategory = new RestoCategory(req.body);
		const savedCategory = await newcategory.save();
		if (savedCategory) {
			return res.json({
				error: false,
				message: "Category Created Successfully!",
				category: savedCategory
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
const GetParticularCategory = async (req, res) => {
	try {
		const category = await RestoCategory.findById(req.params._id);
		if (category ) {
			return res.json({
				error: false,
				message: "Category fetched Successfully!",
				category: category
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				category: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
			category: undefined
		})
	}
}

const GetRestaurantById = async (req, res) => {
	try {
		const category = await RestoCategory.findById(req.params._id);
		const restaurants = await Restaurant.find({ category: category._id }).populate("category");
		if (category ) {
			return res.json({
				error: false,
				message: "Category fetched Successfully!",
				data: {price: category.price, restaurants}
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				data: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
			data: undefined
		})
	}
}

const updateAdminByToken = async (req, res) => {
	try {
		const { _id } = req.admin;
		const admin = await Admin.findByIdAndUpdate(_id, req.body, {
			returnOriginal: false
		})
		if (admin) {
			return res.json({
				error: false,
				message: "Profile Updated Successfully",
				admin
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

module.exports = { CreateCategory, GetParticularCategory, GetRestaurantById };