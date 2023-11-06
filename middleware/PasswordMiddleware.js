const jwt = require('jsonwebtoken');

const passwordMiddleware = (req, res, next) => {
	try {
		let token = req?.headers?.authorization?.split(" ")[1];
		const data = jwt.verify(token, process.env.JWT_SECRET);
		req['user'] = {
			_id: data._id,
			role: data.role
		}
		if (data) {
			next();
		} else {
			return res.json({ error: true, message: "Unauthorized access" });
		}
	} catch (err) {
		return res.json({ error: true, message: err.message })
	}
}

module.exports = passwordMiddleware;