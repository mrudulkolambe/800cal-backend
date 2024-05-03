const Ticket = require("../model/Tickets")

const createTicket = async (req, res) => {
	try {
		const newTicket = new Ticket({ ...req.body, customers: req.customer._id });
		const savedTicket = await newTicket.save()
		return res.json({
			error: false,
			message: "Created Successfully",
			ticket: savedTicket
		})
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const updateTicket = async (req, res) => {
	try {
		const ticket = await Ticket.findByIdAndUpdate(req.params._id, req.body, {
			returnOriginal: false
		}).populate("customers",).populate("calendar")
		return res.json({
			error: false,
			message: "Updated Successfully",
			ticket: ticket
		})
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const getTickets = async (req, res) => {
	try {
		const tickets = await Ticket.find().populate("customers",).populate("calendar").populate({
			path: 'calendar',
			populate: {
				path: 'restaurant',
				model: 'restaurants'
			}
		})
		return res.json({
			error: false,
			message: "Fetched Successfully",
			tickets: tickets
		})
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

const getTicket = async (req, res) => {
	try {
		const tickets = await Ticket.findById(req.params._id).populate("customers",).populate("calendar")
		return res.json({
			error: false,
			message: "Fetched Successfully",
			tickets: tickets
		})
	} catch (error) {
		return res.json({
			error: true,
			message: error.message,
		})
	}
}

module.exports = { createTicket, updateTicket, getTickets, getTicket };