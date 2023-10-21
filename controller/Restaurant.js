const Food = require("../model/Food");
const Restaurant = require("../model/Restaurant");
const RestoCategory = require("../model/RestaurantCategory");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const handleSignup = async (req, res) => {
	try {
		const { username, password, email, title, logo, category } = req.body;
		const restaurant = await Restaurant.findOne({
			username
		});
		if (restaurant) {
			return res.json({
				error: true,
				message: "Restaurant already exists!"
			})
		} else {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			const newRestaurant = new Restaurant({
				username,
				email,
				password: hashedPassword,
				title,
				logo,
				category
			});
			const savedRestaurant = await newRestaurant.save();
			if (savedRestaurant) {
				return res.json({
					error: false,
					message: "Signup Successful!",
				})
			} else {
				return res.json({
					error: true,
					message: "Something went wrong!",
				})
			}
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const handleSignIn = async (req, res) => {
	try {
		const { username, password } = req.body;
		const restaurant = await Restaurant.findOne({
			username
		});
		if (!restaurant) {
			return res.json({
				error: true,
				message: "Restaurant not found!"
			})
		} else {
			if (restaurant.enabled) {
				const isAuthed = await bcrypt.compare(password, restaurant.password);
				if (isAuthed) {
					const token = await jwt.sign({
						_id: restaurant._id,
						role: restaurant.role
					}, process.env.JWT_SECRET);
					return res.json({
						error: false,
						message: "Signin Successful!",
						token: token
					})
				} else {
					return res.json({
						error: true,
						message: "Invalid Credentials!",
					})
				}
			} else {
				return res.json({
					error: true,
					message: "Please contact admin",
				})
			}
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const getRestaurantProfileByToken = async (req, res) => {
	try {
		const { _id } = req.restaurant;
		if (_id) {
			const restaurant = await Restaurant.findById(_id, { password: 0 }).populate("category");
			if (restaurant) {
				return res.json({
					error: false,
					message: "Fetched Successfully!",
					restaurant
				})
			} else {
				return res.json({
					error: true,
					message: "Something went wrong!",
					restaurant
				})
			}
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message
		})
	}
}

const updateRestaurantByToken = async (req, res) => {
	try {
		const { _id } = req.restaurant;
		const body = {
			...req.body
		}
		delete body.password;
		delete body.username;
		delete body.enabled;
		const restaurant = await Restaurant.findByIdAndUpdate(_id, body, {
			returnOriginal: false
		}).populate("category")
		if (restaurant) {
			return res.json({
				error: false,
				message: "Profile Updated Successfully",
				restaurant
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

const getAllRestaurants = async (req, res) => {
	try {
		const restaurants = await Restaurant.find({}, {
			password: 0,
		}).populate("category");
		if (restaurants) {
			return res.json({
				error: false,
				message: "Fetched Successfully!",
				restaurants
			})
		} else {
			return res.json({
				error: false,
				message: "Something went wrong!",
				restaurants: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const enableRestaurant = async (req, res) => {
	try {
		const restaurant = await Restaurant.findByIdAndUpdate(req.body._id, { enabled: true }, {
			returnOriginal: false
		}).populate("category")
		if (restaurant) {
			return res.json({
				error: false,
				message: "Enabled Restaurant!",
				restaurant
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

const suspendRestaurant = async (req, res) => {
	try {
		const restaurant = await Restaurant.findByIdAndUpdate(req.body._id, { enabled: false }, {
			returnOriginal: false
		}).populate("category")
		if (restaurant) {
			return res.json({
				error: false,
				message: "Suspended Restaurant!",
				restaurant
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

const getRestaurantDetails = async (req, res) => {
	try {
		const restaurantDetails = await Restaurant.findById(req.params._id, {
			password: 0, enabled: 0, role: 0
		}).populate("category")
		if (restaurantDetails) {
			const food = await Food.find({ restaurant: restaurantDetails._id }).populate("ingredients").populate("restaurant", { password: 0 });
			const data = { ...restaurantDetails._doc, menu: food, comments: [] }
			return res.json({
				error: false,
				message: "Fetched Successfully",
				restaurant: data
			})
		} else {
			return res.json({
				error: false,
				message: "Something went wrong",
				restaurant: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const getRestaurantsByGroup = async (req, res) => {
	try {
		const goldcategory = await RestoCategory.findOne({ title: "Gold" });
		const goldrestaurants = await Restaurant.find({ category: goldcategory._id }).populate("category");
		const silvercategory = await RestoCategory.findOne({ title: "Silver" });
		const silverrestaurants = await Restaurant.find({ category: silvercategory._id }).populate("category");
		const platinumcategory = await RestoCategory.findOne({ title: "Platinum" });
		const platinumrestaurants = await Restaurant.find({ category: platinumcategory._id }).populate("category");
		if (goldcategory && goldrestaurants && silvercategory && silverrestaurants && platinumcategory && platinumrestaurants) {
			return res.json({
				error: false,
				message: "Fetched Successfully",
				data: {
					gold: {
						price: goldcategory.price,
						restaurants: goldrestaurants,
						_id: goldcategory._id
					},
					silver: {
						price: silvercategory.price,
						restaurants: silverrestaurants,
						_id: silvercategory._id
					},
					platinum: {
						price: platinumcategory.price,
						restaurants: platinumrestaurants,
						_id: platinumcategory._id
					},
				}
			})
		} else {
			return res.json({
				error: false,
				message: "Something went wrong",
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

module.exports = { handleSignup, handleSignIn, getRestaurantProfileByToken, updateRestaurantByToken, getAllRestaurants, enableRestaurant, suspendRestaurant, getRestaurantDetails, getRestaurantsByGroup };