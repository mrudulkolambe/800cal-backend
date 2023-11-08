const nodemailer = require("nodemailer");
const Customer = require("../model/Customer");
const jwt = require("jsonwebtoken");



const resetPasswordEmail = async (req, res) => {
	const transporter = nodemailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		auth: {
			user: `${process.env.SMTP_USER}`,
			pass: `${process.env.SMTP_PASSWORD}`,
		}
	});
	let user = undefined;
	if (req.body.role === "customer") {
		user = await Customer.findOne({
			$or: [{ email: req.body.username }, { username: req.body.username }],
		});
	}
	if (user) {
		const token = jwt.sign({ _id: user._id.toString(), role: user.role }, process.env.JWT_SECRET, {
			expiresIn: '300s'
		})
		user.token = token;
		user.save()
			.then(() => {
				transporter.sendMail({
					from: `"800cal" <${process.env.SMTP_USER}>`,
					to: user.email,
					subject: "Reset your password",
					text: "Hello world?",
					html: `<a href='http://www.google.com/reset-password/${token}'" class="mt-4 px-6 py-3 text-sm bg-[#91218f] text-white rounded-xl font-bold" style="border-radius: 0.75rem;font-weight: 700;margin-top: 1rem;padding-left: 1.5rem;padding-right: 1.5rem;padding-top: 0.75rem;padding-bottom: 0.75rem;font-size: 0.875rem;line-height: 1.25rem;background-color: rgb(145 33 143);color: rgb(255 255 255);">Click here to reset
							   your password</a>`
				})
					.then(() => {
						res.json({ error: false, message: "Password reset email send successfully!", data: { from: process.env.SMTP_USER, to: user.email, subject: "Reset your password" } })
					})
					.catch((err) => {
						res.json({ error: true, message: err.message })
					})
			})
	} else {
		res.json({ error: true, message: "User not found" })
	}

}

module.exports = { resetPasswordEmail }