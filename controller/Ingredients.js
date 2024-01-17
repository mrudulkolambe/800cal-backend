const Ingredients = require("../model/Ingredients");

const ViewAllIngredients = async (req, res) => {
	try {
		const ingredients = await Ingredients.find().populate("restaurant", "-password");
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

const ViewIngredientById = async (req, res) => {
	try {
		const ingredient = await Ingredients.findById(req.params._id).populate("restaurant", "-password");
		if (ingredient) {
			return res.json({
				error: false,
				message: "Fetched Successfully",
				ingredient: ingredient
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				ingredient: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const UpdateIngredient = async (req, res) => {
	try {
		const ingredient = await Ingredients.findByIdAndUpdate(req.params._id, req.body, {
			returnOriginal: false
		});
		if (ingredient) {
			return res.json({
				error: false,
				message: "Updated Successfully",
				ingredient: ingredient
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				ingredient: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const CreateIngredients = async (req, res) => {
	try {
		const newIngredient = await new Ingredients({ ...req.body, restaurant: req.restaurant._id });
		const savedIngredient = await newIngredient.save();
		if (savedIngredient) {
			return res.json({
				error: false,
				message: "Ingredient created successfully!",
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
const CreateAdminIngredients = async (req, res) => {
	try {
		const newIngredient = await new Ingredients({ ...req.body });
		const savedIngredient = await newIngredient.save();
		if (savedIngredient) {
			return res.json({
				error: false,
				message: "Ingredient created successfully!",
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


module.exports = { CreateIngredients, ViewAllIngredients, ViewIngredientById, UpdateIngredient, CreateAdminIngredients };