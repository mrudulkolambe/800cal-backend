const mongoose = require("mongoose");

const CalendarSchema = new mongoose.Schema({
  order: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "orders",
    required: true,
  },
  freezed: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: String,
    required: true,
    default: "processing",
  },
  restaurant: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "restaurants",
  },
  date: {
    type: Number,
  },
  food: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "food"
  },
  meals: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "meals"
  },
  program: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "programs"
  },
  customer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "customers"
  },
  protein:{
    type: String
  },
  carbs: {
    type: String
  },
  fats:{
    type: String
  },
  kcal:{
    type: String
  }
});

module.exports = mongoose.model("calendars", CalendarSchema)
