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
  timestamp: {
    type: Number,
    default: Date.now()
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
  protein: {
    type: String
  },
  carbs: {
    type: String
  },
  fats: {
    type: String
  },
  kcal: {
    type: String
  },
  note: {
    type: [String],
    default: []
  },
  rider: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "riders"
  },
  delivery_status: {
    type: String,
  },
  declined: {
    type: Boolean,
    default: false
  },
  accepted: {
    type: Boolean,
    default: false
  },
});

module.exports = mongoose.model("calendars", CalendarSchema)
