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
  picklat: {
    type: Number,
    default: 29.7065215
  },
  picklng: {
    type: Number,
    default: 47.0877445
  },
  droplat: {
    type: Number,
    default: 29.7112762
  },
  droplng: {
    type: Number,
    default: 47.2762504
  },
  pickupAddress: {
    type: String
  },
  dropAddress: {
    type: String
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
