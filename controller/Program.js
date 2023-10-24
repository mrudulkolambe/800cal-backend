const Program = require("../model/Program");

const createProgram = async (req, res) => {
	try {
		const newProgram = await new Program(req.body);
		const savedProgram = await newProgram.save();
		if (savedProgram) {
			return res.json({
				error: false,
				message: "Created Successfully!",
				program: savedProgram
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				program: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const ViewAllPrograms = async (req, res) => {
	try {
		const programs = await Program.find({});
		if (programs) {
			return res.json({
				error: false,
				message: "Fetched Successfully!",
				program: programs
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				program: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const UpdatePrograms = async (req, res) => {
	try {
		const updatedProgram = await Program.findByIdAndUpdate(req.params._id, req.body, {
			returnOriginal: false
		})
		if (updatedProgram) {
			return res.json({
				error: false,
				message: "Program Updated Successfully",
				program: updatedProgram
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				program: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

module.exports = { createProgram, ViewAllPrograms, UpdatePrograms };