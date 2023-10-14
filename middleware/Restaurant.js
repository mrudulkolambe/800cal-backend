const jwt = require("jsonwebtoken");

const handleRestaurant = (req, res, next) => {
	try {
		const authCode = req.headers['authorization']
		if (authCode && authCode.includes("Bearer ")) {
			const token = authCode.split("Bearer ")[1];
			const data = jwt.verify(token, process.env.JWT_SECRET)
			if(data.role === "restaurant"){
				req['restaurant'] = data;
				next();
			}else{
				return res.json({
					error: true,
					message: "Unauthorized Access"
				})
			}
		} else {
			return res.json({
				error: true,
				message: "Unauthorized Access"
			})
		}
	} catch (error) {
		return res.json({
			error: true,
			message: error.message
		})
	}
}

module.exports = handleRestaurant;