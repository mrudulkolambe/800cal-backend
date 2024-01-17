const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Manager = require("../model/Manager");


const handleSignup = async (req, res) => {
	try {
		const { username, password, email } = req.body;
		const manager = await Manager.findOne({
			username
		});
		if (manager) {
			return res.json({
				error: true,
				message: "User already exists!"
			})
		} else {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(password, salt);
			const newmanager = new Manager({...req.body,
				password: hashedPassword
			});
			const savedmanager = await newmanager.save();
			if (savedmanager) {
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
		const manager = await Manager.findOne({
			username
		});
		if (!manager) {
			return res.json({
				error: true,
				message: "User not found!"
			})
		} else {
			const isAuthed = await bcrypt.compare(password, manager.password);
			if (isAuthed) {
				const token = await jwt.sign({
					_id: manager._id,
					role: manager.role
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

const getManagerProfileByToken = async (req, res) => {
	try {
		const { _id } = req.manager;
		if (_id) {
			const manager = await Manager.findById(_id, { password: 0 });
			if (manager) {
				return res.json({
					error: false,
					message: "Fetched Successfully!",
					manager
				})
			} else {
				return res.json({
					error: true,
					message: "Something went wrong!",
					manager
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

const updateManagerByToken = async (req, res) => {
	try {
		const manager = await Manager.findByIdAndUpdate(req.params._id, req.body, {
			returnOriginal: false
		})
		if (manager) {
			return res.json({
				error: false,
				message: "Profile Updated Successfully",
				manager
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


const getAllManagers = async (req, res) => {
	try {
		const managers = await Manager.find({})
		if (managers) {
			return res.json({
				error: false,
				message: "Fetched Successfully",
				managers: managers
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				managers: []
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
			managers: []
		})
	}
}

const getManagerInfo = async (req, res) => {
	try {
		const manager = await Manager.findById(req.params._id)
		if (manager) {
			return res.json({
				error: false,
				message: "Profile Fetched Successfully",
				manager: manager
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				manager: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
			manager: undefined
		})
	}
}

module.exports = { handleSignup, handleSignIn, getManagerProfileByToken, updateManagerByToken, getAllManagers, getManagerInfo };