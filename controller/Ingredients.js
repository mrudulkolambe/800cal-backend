const Ingredients = require("../model/Ingredients");

const ViewAllIngredients = async (req, res) => {
	try {
		const ingredients = await Ingredients.find({});
		if (ingredients) {
			return res.json({
				error: false,
				message: "Fetched Successfully",
				ingredients: ingredients
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				ingredients: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

// const ViewMealByProgramId = async (req, res) => {
// 	try {
// 		const meals = await Meals.find({ program: req.params._id });
// 		if (meals) {
// 			return res.json({
// 				error: false,
// 				message: "Fetched Successfully",
// 				meal: meals
// 			})
// 		} else {
// 			return res.json({
// 				error: true,
// 				message: "Something went wrong!",
// 				meal: undefined
// 			})
// 		}
// 	} catch (error) {
// 		return res.json({
// 			error: true,
// 			message: error.message,
// 		})
// 	}
// }

const CreateIngredients = async (req, res) => {
	try {
		const newIngredient = await new Ingredients(req.body);
		const savedIngredient = await newIngredient.save();
		if (savedIngredient) {
			return res.json({
				error: false,
				message: "Meal created successfully!",
				ingredient: savedIngredient
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


module.exports = { CreateIngredients, ViewAllIngredients };