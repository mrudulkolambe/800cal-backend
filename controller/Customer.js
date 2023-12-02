const Customer = require("../model/Customer");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


const handleSignup = async (req, res) => {
	try {
		const { username, password, email } = req.body;
		const customer = await Customer.findOne({
			username
		});
		if (customer) {
			return res.json({
				error: true,
				message: "User already exists!"
			})
		} else {
			if (req.body.referredby) {
				const referreduser = await Customer.findOne({ referralcode: req.body.referredby });
				if (referreduser) {
					const data = await Customer.findOneAndUpdate({ _id: referreduser._id }, {
						$inc: { referralpoints: 100 }
					}, { returnOriginal: false })
					const salt = await bcrypt.genSalt(10);
					const hashedPassword = await bcrypt.hash(password, salt);
					const newcustomer = new Customer({
						...req.body,
						password: hashedPassword
					});
					newcustomer.referralcode = `${newcustomer.username.slice(0, 4)}${newcustomer._id.toString().slice(20)}`
					const savedCustomer = await newcustomer.save();
					const token = await jwt.sign({
						_id: savedCustomer._id,
						role: savedCustomer.role
					}, process.env.JWT_SECRET);
					if (savedCustomer) {
						return res.json({
							error: false,
							message: "Signup Successful!",
							token: token
						})
					} else {
						return res.json({
							error: true,
							message: "Something went wrong!",
						})
					}
				} else {
					return res.json({
						error: true,
						message: "Invalid Referral Code"
					})
				}
			} else {
				const salt = await bcrypt.genSalt(10);
				const hashedPassword = await bcrypt.hash(password, salt);
				const newcustomer = new Customer({
					...req.body,
					password: hashedPassword
				});
				newcustomer.referralcode = `${newcustomer.username.slice(0, 4)}${newcustomer._id.toString().slice(20)}`
				const savedCustomer = await newcustomer.save();
				const token = await jwt.sign({
					_id: savedCustomer._id,
					role: savedCustomer.role
				}, process.env.JWT_SECRET);
				if (savedCustomer) {
					return res.json({
						error: false,
						message: "Signup Successful!",
						token: token
					})
				} else {
					return res.json({
						error: true,
						message: "Something went wrong!",
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

const handleSignIn = async (req, res) => {
	try {
		const { username, password } = req.body;
		const customer = await Customer.findOne({
			$or: [{ email: username }, { username: username }],
		});
		if (!customer) {
			return res.json({
				error: true,
				message: "User not found!"
			})
		} else {
			if (customer.disabled) {
				return res.json({
					error: true,
					message: "Contact admin!",
				})
			} else {
				console.log(password, customer.password)
				const isAuthed = await bcrypt.compare(password, customer.password);
				if (isAuthed) {
					const token = await jwt.sign({
						_id: customer._id,
						role: customer.role
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

const getCustomerProfileByToken = async (req, res) => {
	try {
		const { _id } = req.customer;
		if (_id) {
			const customer = await Customer.findById(_id, { password: 0 });
			if (customer) {
				return res.json({
					error: false,
					message: "Fetched Successfully!",
					customer
				})
			} else {
				return res.json({
					error: true,
					message: "Something went wrong!",
					customer
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

const updateCustomerByToken = async (req, res) => {
	try {
		const { _id } = req.customer;
		const customer = await Customer.findByIdAndUpdate(_id, req.body, {
			returnOriginal: false
		})
		if (customer) {
			return res.json({
				error: false,
				message: "Profile Updated Successfully",
				customer
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

const getAllCustomers = async (req, res) => {
	try {
		const customers = await Customer.find({}, {
			password: 0
		})
		if (customers) {
			return res.json({
				error: false,
				message: "Fetched Successfully!",
				customers
			})
		} else {
			return res.json({
				error: true,
				message: "Something went wrong!",
				customers: undefined
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const resetPassword = async (req, res) => {
	try {
		let user = undefined;
		if (req.customer.role === "customer") {
			user = await Customer.findById(req.customer._id);
		}
		let token = req?.headers?.authorization?.split(" ")[1];
		if (user.token && user.token === token) {
			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(req.body.password, salt);
			user.password = hashedPassword
			user.token = ""
			user.save()
				.then(() => {
					res.json({ error: false, message: "Password Updated Successfully!" })
				})
				.catch((err) => {
					res.json({ error: true, message: err.message })
				})
		} else {
			res.json({ error: true, message: "Something went wrong!" })
		}

	} catch (error) {
		res.json({ error: true, message: error.message });
	}
}

module.exports = { handleSignup, handleSignIn, getCustomerProfileByToken, updateCustomerByToken, getAllCustomers, resetPassword };	