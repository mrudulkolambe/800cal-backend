const Meals = require("../model/Meals")

const ViewMeal = async (req, res) => {
	try {
		const meals = await Meals.find({}).populate("program");
		if (meals) {
			return res.json({
				error: false,
				message: "Fetched Successfully",
				meal: meals
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				meal: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const ViewMealByProgramId = async (req, res) => {
	try {
		const meals = await Meals.find({ program: req.params._id });
		if (meals) {
			return res.json({
				error: false,
				message: "Fetched Successfully",
				meal: meals
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				meal: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const createMeal = async (req, res) => {
	try {
		const newMeal = await new Meals(req.body);
		const savedMeal = await newMeal.save();
		if (savedMeal) {
			return res.json({
				error: false,
				message: "Meal created successfully!",
				meal: savedMeal
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


module.exports = { createMeal, ViewMeal, ViewMealByProgramId };