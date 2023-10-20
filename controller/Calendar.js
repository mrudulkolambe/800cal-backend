const Calendar = require("../model/Calendar");

const createCalendarDate = async (req, res) => {
  try {
    const newcalendardate = new Calendar({ customer: req.customer._id, ...req.body });
    const savedcalendar = await newcalendardate.save();
    if (savedcalendar) {
      return res.json({
        error: true,
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



module.exports = { createCalendarDate };