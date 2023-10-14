const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const customerRouter = require('./routes/Customer');
const restaurantRouter = require('./routes/Restaurant');
const programRouter = require('./routes/Program');
const mealRouter = require('./routes/Meal');
const adminRouter = require('./routes/Admin');
const riderRouter = require('./routes/Rider');
const restaurantCategoryRouter = require('./routes/RestaurantCategory');
const ingredientsRouter = require('./routes/Ingredients');
const foodRouter = require('./routes/Food');

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({
	origin: ["*", "https://800cal-restaurant-dashboard.vercel.app", "https://800cal-admin-dashboard.vercel.app", "http://localhost:3000", "http://localhost:3001"]
}))

app.use("/admin", adminRouter);
app.use("/rider", riderRouter);
app.use("/customer", customerRouter);
app.use("/restaurant", restaurantRouter);
app.use("/program", programRouter);
app.use("/meal", mealRouter);
app.use("/resto-category", restaurantCategoryRouter);
app.use("/ingredients", ingredientsRouter);
app.use("/food", foodRouter);

app.get("/", (req, res) => {
	res.send("Server Is Live!")
})

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log("Connected to db"))
	.catch((err) => console.log(err))

app.listen(process.env.PORT, () => {
	console.log("Server started: http://localhost:5000")
})