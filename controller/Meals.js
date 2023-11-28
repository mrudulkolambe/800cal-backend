const Meals = require("../model/Meals")

const ViewMeal = async (req, res) => {
	try {
		const meals = await Meals.find({ }).populate("program");
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
		const meals = await Meals.find({ program: req.params._id, published: true });
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

const GetMealByID = async (req, res) => {
	try {
		const meal = await Meals.findById(req.params._id).populate("program");
		if (meal) {
			return res.json({
				error: false,
				message: "Fetched Successfully",
				meal: meal
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
			const data = await Meals.findById(savedMeal._id).populate("program");
			return res.json({
				error: false,
				message: "Meal created successfully!",
				meal: data
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

const updateMeal = async (req, res) => {
	try {
		const updatedMeal = await Meals.findByIdAndUpdate(req.params._id, req.body, {
			returnOriginal: false
		});
		if (updatedMeal) {
			const data = await Meals.findById(updatedMeal._id).populate("program")
			return res.json({
				error: false,
				message: "Meal created successfully!",
				meal: data
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


module.exports = { createMeal, ViewMeal, ViewMealByProgramId, updateMeal, GetMealByID };