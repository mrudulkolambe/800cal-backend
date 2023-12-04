const AppliedRestaurant = require("../model/AppliedRestaurant")

const ApplyForMeal = async (req, res) => {
	try {
		const isApplied = await AppliedRestaurant.findOne({
			restaurant: req.restaurant._id,
			meal: req.body.meal
		});
		if (isApplied) {
			return res.json({
				error: true,
				message: "Already applied to meal!",
			})
		} else {
			const newApply = await new AppliedRestaurant({ ...req.body, restaurant: req.restaurant._id });
			const savedApplication = await newApply.save();
			if (newApply) {
				return res.json({
					error: false,
					message: "Applied Successfully",
					info: savedApplication
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
			message: error.message
		})
	}
}

const GetAppliedMeals = async (req, res) => {
	try {
		const applications = await AppliedRestaurant.find().sort({ "timestamp": -1 }).populate("restaurant", "-password").populate({
			path: 'meal',
			populate: {
				path: 'program',
				model: 'programs'
			}
		});
		if (applications) {
			return res.json({
				error: false,
				message: "Fetched Successfully!",
				info: applications
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
			message: error.message
		})
	}
}

const GetAppliedRestaurantAndMeal = async (req, res) => {
	try {
		console.log(req.restaurant._id, req.params.meal)
		const application = await AppliedRestaurant.findOne({ restaurant: req.restaurant._id, meal: req.params.meal }).populate("restaurant", "-password").populate({
			path: 'meal',
			populate: {
				path: 'program',
				model: 'programs'
			}
		});
		if (application) {
			return res.json({
				error: false,
				message: "Fetched Successfully!",
				info: application
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
			message: error.message
		})
	}
}

const GetAppliedRestaurantByMeal = async (req, res) => {
	try {
		const application = await AppliedRestaurant.find({ meal: req.params.meal }).populate("restaurant", "-password").populate({
			path: 'meal',
			populate: {
				path: 'program',
				model: 'programs'
			}
		});
		if (application) {
			return res.json({
				error: false,
				message: "Fetched Successfully!",
				info: application
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
			message: error.message
		})
	}
}

const AppliedMealApprove = async (req, res) => {
	try {
		const application = await AppliedRestaurant.findOneAndUpdate({ restaurant: req.body.restaurant, meal: req.body.meal }, {
			approved: true
		}, {
			returnOriginal: false
		})
		if (application) {
			const updatedApplication = await AppliedRestaurant.findById(application._id).populate("restaurant", "-password").populate({
				path: 'meal',
				populate: {
					path: 'program',
					model: 'programs'
				}
			});
			return res.json({
				error: false,
				message: "Approved Successfully!",
				info: updatedApplication
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
			message: error.message
		})
	}
}

module.exports = { ApplyForMeal, GetAppliedMeals, GetAppliedRestaurantAndMeal, AppliedMealApprove, GetAppliedRestaurantByMeal };