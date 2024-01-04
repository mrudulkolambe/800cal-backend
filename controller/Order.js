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
    const orders = await Order.find({ customer: req.customer._id }).populate("meals").populate("program").populate("customer", "-password").sort({ timestamp: 'desc' })
    if (orders) {
      return res.json({
        error: false,
        message: "Subscription Fetched Successfully!",
        subscriptions: orders
      })
    } else {
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

const getOrdersByCategory = async (req, res) => {
  try {
    let orders = []
    if (req.params.category === "all") {
      orders = await Order.find().populate("meals").populate("program").populate("customer", "-password, -balance").sort({ timestamp: 'desc' })
    } else {
      orders = await Order.find({ order_status: req.params.category }).populate("meals").populate("program").populate("customer", "-password, -balance").sort({ timestamp: 'desc' })
    }
    if (orders) {
      return res.json({
        error: false,
        message: "Subscription Fetched Successfully!",
        subscriptions: orders
      })
    } else {
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
    const order = await Order.findOne({ _id: req.params._id }).populate("meals").populate("program").populate("customer", "-password");
    const calendars = await Calendar.find({ order: order._id }).populate("meals").populate("program").populate("restaurant", "-password").populate("customer", "-password");
    if (order && calendars) {
      return res.json({
        error: false,
        message: "Fetched Successfully!",
        subscription: { ...order.toObject(), calendar: calendars }
      })
    } else {
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

const getUserSubscriptionsById = async (req, res) => {
  try {
    const order = await Order.find({ customer: req.params._id }).populate("meals").populate("program").populate("customer", "-password");
    return res.json({
      error: false,
      message: "Fetched Successfully!",
      subscription: order
    })
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    })
  }
}

const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params._id, req.body, {
      returnOriginal: false
    });
    const updateOrder = await Order.findById(order._id).populate("meals").populate("program").populate("customer", "-password")
    if (updateOrder) {
      return res.json({
        error: false,
        message: "Fetched Successfully!",
        subscription: updateOrder
      })
    } else {
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

const riderNewOrder = async (req, res) => {
  try {
    const order = await Calendar.findOne({ rider: req.rider._id, delivery_status: "assigned" }).populate("customer", "-password").populate("program").populate("meals").populate("food").populate("order").populate("restaurant", "-password").populate("rider", "-password");
    return res.json({
      error: false,
      message: "Fetched Successfully!",
      order: order
    })
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    })
  }
}

const assignOrder = async (req, res) => {
  try {
    const order = await Calendar.findByIdAndUpdate(req.params._id, { ...req.body }, { returnOriginal: false });
    const order1 = await Calendar.findById(req.params._id).populate("customer", "-password").populate("program").populate("meals").populate("food").populate("order").populate("restaurant", "-password").populate("rider", "-password");
    if (order1) {
      return res.json({
        error: false,
        message: "Order Assiged",
        order: order1
      })
    } else {
      return res.json({
        error: true,
        message: "Something went wrong!",
        order: undefined
      })
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    })
  }
}

const riderOrders = async (req, res) => {
  try {
    const orders = await Calendar.find({ rider: req.rider._id }).populate("customer", "-password").populate("program").populate("meals").populate("food").populate("order").populate("restaurant", "-password").populate("rider", "-password")
    if (orders) {
      return res.json({
        error: false,
        message: "Orders fetched successfully!",
        orders: orders
      })
    }
    else {
      return res.json({
        error: true,
        message: "Something went wrong!",
      })
    }
  }
  catch (error) {
    return res.json({
      error: true,
      message: error.message,
    })
  }
}
module.exports = { createOrder, getUserOrders, getUserOrderById, getOrdersByCategory, updateOrder, riderNewOrder, assignOrder, riderOrders, getUserSubscriptionsById }