const Calendar = require("../model/Calendar");

const createCalendarDate = async (req, res) => {
  try {
    const newcalendardate = new Calendar({ customer: req.customer._id, ...req.body });
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
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    })
  }
}

const getCalendarByCategory = async (req, res) => {
  try {
    const calendar = await Calendar.find().populate("customer", "-password, -balance").populate("food").populate("meals").populate("program").populate("order").populate("restaurant", "-password");
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
    const updatedCalendar = await Calendar.findById(calendar._id).populate("customer", "-password, -balance").populate("food").populate("meals").populate("program").populate("order").populate("restaurant", "-password");
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



module.exports = { createCalendarDate, getCalendarByCategory, UpdateCalendar };