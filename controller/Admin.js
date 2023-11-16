const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Admin = require("../model/Admin");
const Details = require("../model/Data");


const handleSignup = async (req, res) => {
	try {
		const { username, password, email } = req.body;
		const admin = await Admin.findOne({
			username
		});
		if (admin) {
			return res.json({
				error: true,
				message: "User already exists!"
			})
		} else {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			const newAdmin = new Admin({
				username,
				email,
				password: hashedPassword
			});
			const savedAdmin = await newAdmin.save();
			if (savedAdmin) {
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
		const admin = await Admin.findOne({
			username
		});
		if (!admin) {
			return res.json({
				error: true,
				message: "User not found!"
			})
		} else {
			const isAuthed = await bcrypt.compare(password, admin.password);
			if (isAuthed) {
				const token = await jwt.sign({
					_id: admin._id,
					role: admin.role
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
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const getAdminProfileByToken = async (req, res) => {
	try {
		const { _id } = req.admin;
		if (_id) {
			const admin = await Admin.findById(_id, { password: 0 });
			if (admin) {
				return res.json({
					error: false,
					message: "Fetched Successfully!",
					admin
				})
			} else {
				return res.json({
					error: true,
					message: "Something went wrong!",
					admin
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

const createDetails = async (req, res) => {
	try {
		const newDetails = await new Details(req.body);
		const savedDetails = await newDetails.save();
		if (savedDetails) {
			return res.json({
				error: false,
				message: "Details Created Successfully",
				details: newDetails
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				details: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const updateDetails = async (req, res) => {
	try {
		const details = await Details.findOne({});
		const updatedDetails = await Details.findByIdAndUpdate(details._id, req.body, {
			returnOriginal: false
		})
		if (updatedDetails) {
			return res.json({
				error: false,
				message: "Details Updated Successfully",
				details: updatedDetails
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				details: updatedDetails
			})
		}
	} catch (error) {
		console.log(error)
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const getDetails = async (req, res) => {
	try {
		const details = await Details.findOne({});
		if (details) {
			return res.json({
				error: false,
				message: "Details Fetched Successfully",
				details: details
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				details: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

module.exports = { handleSignup, handleSignIn, getAdminProfileByToken, updateAdminByToken, createDetails, updateDetails, getDetails };