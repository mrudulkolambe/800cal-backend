const Calendar = require("../model/Calendar");
const Order = require("../model/Order")

const createOrder = async (req, res) => {
  try {
    const neworder = new Order({ customer: req.customer._id, ...req.body });
    const savedOrder = await neworder.save();
    if (savedOrder) {
      return res.json({
        error: false,
        message: "Subscription Created Successfully!",
        subscription: savedOrder
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

const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({customer: req.customer._id}).populate("meals").populate("program").populate("restaurantCategory").populate("customer", "-password")
    if(orders){
      return res.json({
        error: false,
        message: "Subscription Fetched Successfully!",
        subscriptions: orders
      })
    }else{
      return res.json({
        error: true,
        message: "Something went wrong!",
        subscriptions: []
      })
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    })
  }
}

const getUserOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({_id: req.params._id}).populate("meals").populate("program").populate("restaurantCategory").populate("customer", "-password");
    const calendars = await Calendar.find({order: order._id}).populate("meals").populate("program").populate("restaurant","-password").populate("customer", "-password");
    if(order && calendars){
      return res.json({
        error: false,
        message: "Fetched Successfully!",
        subscription: {...order.toObject(), calendar: calendars}
      })
    }else{
      return res.json({
        error: true,
        message: "Something went wrong!",
        subscription: undefined
      })
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    })
  }
}


module.exports = { createOrder, getUserOrders, getUserOrderById }