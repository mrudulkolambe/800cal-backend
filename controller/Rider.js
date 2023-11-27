const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const Rider = require('../model/Rider');


const handleSignup = async (req, res) => {
	try {
		const rider = await Rider.findOne({
			username: req.body.username
		});
		if (rider) {
			return res.json({
				error: true,
				message: "User already exists!"
			})
		} else {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(req.body.password, salt);
			const newRider = new Rider({
				...req.body,
				password: hashedPassword,
				restaurant: req.restaurant._id,
			});
			const savedRider = await newRider.save();
			if (savedRider) {
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
		const rider = await Rider.findOne({
			username
		});
		if (!rider) {
			return res.json({
				error: true,
				message: "User not found!"
			})
		} else {
			if (rider.disabled) {
				return res.json({
					error: true,
					message: "Contact admin!"
				})
			} else {
				const isAuthed = await bcrypt.compare(password, rider.password);
				if (isAuthed) {
					const token = await jwt.sign({
						_id: rider._id,
						role: rider.role
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
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const getRiderProfileByToken = async (req, res) => {
	try {
		const { _id } = req.rider;
		if (_id) {
			const rider = await Rider.findById(_id, { password: 0 });
			if (rider) {
				return res.json({
					error: false,
					message: "Fetched Successfully!",
					rider
				})
			} else {
				return res.json({
					error: true,
					message: "Something went wrong!",
					rider
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

const updateRiderByToken = async (req, res) => {
	try {
		const { _id } = req.rider;
		const rider = await Rider.findByIdAndUpdate(_id, req.body, {
			returnOriginal: false
		})
		if (rider) {
			return res.json({
				error: false,
				message: "Profile Updated Successfully",
				rider
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
const updateRiderByAdmin = async (req, res) => {
	try {
		const rider = await Rider.findByIdAndUpdate(req.params._id, req.body, {
			returnOriginal: false
		})
		if (rider) {
			return res.json({
				error: false,
				message: "Profile Updated Successfully",
				rider
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

const getAllRiders = async (req, res) => {
	try {
		const riders = await Rider.find({}).populate("restaurant", { password: 0 })
		if (riders) {
			return res.json({
				error: false,
				message: "Profile Updated Successfully",
				riders: riders
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				riders: []
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
			riders: []
		})
	}
}

const getRiderInfo = async (req, res) => {
	try {
		const rider = await Rider.findById(req.params._id).populate("restaurant", { password: 0 })
		if (rider) {
			return res.json({
				error: false,
				message: "Profile Fetched Successfully",
				rider: rider
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				rider: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
			rider: undefined
		})
	}
}

module.exports = { handleSignup, handleSignIn, getRiderProfileByToken, updateRiderByToken, getAllRiders, getRiderInfo, updateRiderByAdmin };