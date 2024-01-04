const moment = require("moment/moment");
const Calendar = require("../model/Calendar");
const AppliedRestaurant = require("../model/AppliedRestaurant");

const createCalendarDate = async (req, res) => {
  try {
    if (req.customer._id) {
      const appliedResto = await AppliedRestaurant.findOne({ restaurant: req.body.restaurant, meal: req.body.meals });
      const newcalendardate = new Calendar({ customer: req.customer._id, ...req.body, vendor_price: appliedResto._id });
      const savedcalendar = await newcalendardate.save();
      if (savedcalendar) {
        return res.json({
          error: false,
          message: "Created Successfully",
          calendar: savedcalendar
        })
      } else {
        return res.json({
          error: true,
          message: "Something went wrong",
        })
      }
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    })
  }
}

const getCalendarByCategory = async (req, res) => {
  try {
    const calendar = await Calendar.find().populate("customer", "-password").populate("food").populate("meals").populate("program").populate("order").populate("restaurant", "-password").sort({
      date: "descending"
    });
    if (calendar) {
      return res.json({
        error: false,
        message: "Fetched Successfully!",
        calendar: calendar
      })
    } else {
      return res.json({
        error: true,
        message: "Something went wrong",
      })
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    })
  }
}

const UpdateCalendar = async (req, res) => {
  try {
    const calendar = await Calendar.findByIdAndUpdate(req.params._id, req.body);
    const updatedCalendar = await Calendar.findById(calendar._id).populate("customer", "-password").populate("food").populate("meals").populate("program").populate("order").populate("restaurant", "-password");
    if (updatedCalendar) {
      return res.json({
        error: false,
        message: "Updated Successfully!",
        calendar: updatedCalendar
      })
    } else {
      return res.json({
        error: true,
        message: "Something went wrong",
      })
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    })
  }
}

const handleRestaurantToken = async (req, res) => {
  try {
    const calendars = await Calendar.find({
      restaurant: req.restaurant._id
    }).populate("program").populate("customer", "-password").populate("meals").populate("restaurant").populate("food").populate("order").populate("vendor_price").sort({
      date: "descending"
    })
    if (calendars) {
      return res.json({
        error: false,
        message: "Fetched Successfully!",
        calendar: calendars
      })
    } else {
      return res.json({
        error: true,
        message: "Something went wrong!",
        calendar: []
      })
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    })
  }
}
const handleRestaurantCalendar = async (req, res) => {
  try {
    const calendars = await Calendar.find({
      restaurant: req.restaurant._id, date: {
        $lte: Number(req.params.timestamp) + (86400000 * 3)
      }
    }).populate("program").populate("customer", "-password").populate("meals").populate("restaurant").populate("food").populate("order").populate("vendor_price").sort({
      date: "descending"
    })
    if (calendars) {
      return res.json({
        error: false,
        message: "Fetched Successfully!",
        calendar: calendars
      })
    } else {
      return res.json({
        error: true,
        message: "Something went wrong!",
        calendar: []
      })
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    })
  }
}


const getCalendarByID = async (req, res) => {
  try {
    const calendar = await Calendar.findById(req.params._id).populate("program").populate("customer", "-password").populate("meals").populate("restaurant").populate("food").populate("order").populate("rider", "-password")
    if (calendar) {
      return res.json({
        error: false,
        message: "Fetched Successfully!",
        calendar: calendar
      })
    } else {
      return res.json({
        error: true,
        message: "Something went wrong!",
        calendar: undefined
      })
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    })
  }
}

const getCalendarByCustomerID = async (req, res) => {
  try {
    const calendar = await Calendar.find({customer: req.params._id}).populate("program").populate("customer", "-password").populate("meals").populate("restaurant").populate("food").populate("order").populate("rider", "-password")
    if (calendar) {
      return res.json({
        error: false,
        message: "Fetched Successfully!",
        calendar: calendar
      })
    } else {
      return res.json({
        error: true,
        message: "Something went wrong!",
        calendar: undefined
      })
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    })
  }
}

module.exports = { createCalendarDate, getCalendarByCategory, UpdateCalendar, handleRestaurantCalendar, getCalendarByID, handleRestaurantToken, getCalendarByCustomerID };