const Program = require("../model/Program");

const createProgram = async (req, res) => {
  try {
    const newProgram = await new Program(req.body);
    const savedProgram = await newProgram.save();
    if (savedProgram) {
      return res.json({
        error: false,
        message: "Created Successfully!",
        program: savedProgram,
      });
    } else {
      return res.json({
        error: true,
        message: "Something went wrong!",
        program: undefined,
      });
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    });
  }
};

const ViewAllPrograms = async (req, res) => {
  try {
    const programs = await Program.find({});
    if (programs) {
      return res.json({
        error: false,
        message: "Fetched Successfully!",
        program: programs,
      });
    } else {
      return res.json({
        error: true,
        message: "Something went wrong!",
        program: undefined,
      });
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    });
  }
};

const UpdatePrograms = async (req, res) => {
  try {
    const updatedProgram = await Program.findByIdAndUpdate(
      req.params._id,
      req.body,
      {
        returnOriginal: false,
      }
    );
    if (updatedProgram) {
      return res.json({
        error: false,
        message: "Program Updated Successfully",
        program: updatedProgram,
      });
    } else {
      return res.json({
        error: true,
        message: "Something went wrong!",
        program: undefined,
      });
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    });
  }
};

const GetProgramById = async (req, res) => {
  try {
    const program = await Program.findById(req.params._id);
    if (program) {
      return res.json({
        error: false,
        message: "Program Fetched Successfully",
        program: program,
      });
    } else {
      return res.json({
        error: true,
        message: "Something went wrong!",
        program: undefined,
      });
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    });
  }
};

const searchProgram = async (req, res) => {
  try {
    const { name, tag, rating, kcalMin, kcalMax } = req.query;

    // Build search query
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    if (tag) {
      query.tag = { $regex: tag, $options: "i" }; // Case-insensitive search
    }

    if (rating) {
      query.rating = parseInt(rating);
    }

    if (kcalMin !== undefined || kcalMax !== undefined) {
      query.kcal = {};
      if (kcalMin !== undefined) {
        query.kcal.$gte = parseInt(kcalMin);
      }
      if (kcalMax !== undefined) {
        query.kcal.$lte = parseInt(kcalMax);
      }
    }

    const programs = await Program.find(query);
    res.json({
      error: false,
      message: "Programs fetched successfully",
      programs,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = {
  createProgram,
  ViewAllPrograms,
  UpdatePrograms,
  GetProgramById,
  searchProgram,
};
