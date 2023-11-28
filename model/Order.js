const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  timestamp: {
    type: Number,
    required: true,
    default: Date.now()
  },
  customer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "customers",
  },
  startDate: {
    type: Number,
    required: true
  },
  endDate: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  includeFridays: {
    type: Boolean,
    required: true,
  },
  discount: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  subtotal: {
    type: Number,
    default: 0
  },
  shippingcost: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    required: true,
    enum: ["gold", "silver", "platinum"],
  },
  choosenprice: {
    type: Number,
    required: true,
    default: 0
  },
  listofrestaurants: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "restaurants",
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  name: {
    type: String
  },
  address: {
    type: String,
  },
  payment_status: {
    type: String,
    enum: ["success", "failed"],
  },
  order_status: {
    type: String,
    default: "new"
  },
  program: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "programs",
    required: true
  },
  meals: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "meals"
  },
});

module.exports = mongoose.model("orders", OrderSchema)