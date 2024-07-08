const Customer = require("../model/Customer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const TemporaryCustomer = require("../model/TemporaryCustomer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// Generate OTP function
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const handleSignup = async (req, res) => {
  const {
    username,
    email,
    password,
    phonenumber,
    firstname,
    lastname,
    address,
  } = req.body;
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

  try {
    // Check if user already exists in TemporaryCustomer
    const existingUser = await TemporaryCustomer.findOne({ email });

    if (existingUser) {
      await TemporaryCustomer.deleteOne({ email });
    }

    // Create a new temporary customer
    const hashedPassword = await bcrypt.hash(password, 10);
    const tempCustomer = new TemporaryCustomer({
      username,
      email,
      password: hashedPassword,
      phonenumber,
      firstname,
      lastname,
      address,
      otp,
      otpExpiresAt: expiresAt,
    });
    await tempCustomer.save();

    // Send OTP email
    await transporter.sendMail({
      from: `"800cal" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Verify your email",
      text: `Your OTP is ${otp}`,
      html: `<p>Your OTP is <strong>${otp}</strong></p>`,
    });

    res.status(200).json({
      message: "OTP sent to your email",
      customerId: tempCustomer._id,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const verifyOtp = async (req, res) => {
  const { customerId, otp } = req.body;

  try {
    // Find the temporary customer
    const tempCustomer = await TemporaryCustomer.findById(customerId);

    if (!tempCustomer) {
      return res.status(400).json({ error: "Invalid request" });
    }

    // Check if OTP is valid and not expired
    if (tempCustomer.otp !== otp || new Date() > tempCustomer.otpExpiresAt) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // Move customer data to the Customer collection
    const newCustomer = new Customer({
      username: tempCustomer.username,
      email: tempCustomer.email,
      password: tempCustomer.password,
      phonenumber: tempCustomer.phonenumber,
      firstname: tempCustomer.firstname,
      lastname: tempCustomer.lastname,
      address: tempCustomer.address,
    });
    await newCustomer.save();

    // Remove temporary customer
    await TemporaryCustomer.deleteOne({ _id: customerId });

    // Create and send JWT
    const token = jwt.sign(
      { _id: newCustomer._id, role: newCustomer.role },
      process.env.JWT_SECRET
    );

    res.status(200).json({ message: "Signup successful", token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const handleSignIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const customer = await Customer.findOne({
      $or: [{ email: username }, { username: username }],
    });
    if (!customer) {
      return res.json({
        error: true,
        message: "User not found!",
      });
    } else {
      if (customer.disabled) {
        return res.json({
          error: true,
          message: "Contact admin!",
        });
      } else {
        const isAuthed = await bcrypt.compare(password, customer.password);
        if (isAuthed) {
          const token = await jwt.sign(
            {
              _id: customer._id,
              role: customer.role,
            },
            process.env.JWT_SECRET
          );
          return res.json({
            error: false,
            message: "Signin Successful!",
            token: token,
          });
        } else {
          return res.json({
            error: true,
            message: "Invalid Credentials!",
          });
        }
      }
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    });
  }
};

const getCustomerProfileByToken = async (req, res) => {
  try {
    const { _id } = req.customer;
    if (_id) {
      const customer = await Customer.findById(_id, { password: 0 });
      if (customer) {
        return res.json({
          error: false,
          message: "Fetched Successfully!",
          customer,
        });
      } else {
        return res.json({
          error: true,
          message: "Something went wrong!",
          customer,
        });
      }
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { _id } = req.params;
    if (_id) {
      const customer = await Customer.findById(_id, { password: 0 });
      if (customer) {
        return res.json({
          error: false,
          message: "Fetched Successfully!",
          customer,
        });
      } else {
        return res.json({
          error: true,
          message: "Something went wrong!",
          customer,
        });
      }
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    });
  }
};

const updateCustomerByToken = async (req, res) => {
  try {
    const { _id } = req.customer;
    const customer = await Customer.findByIdAndUpdate(_id, req.body, {
      returnOriginal: false,
    });
    if (customer) {
      return res.json({
        error: false,
        message: "Profile Updated Successfully",
        customer,
      });
    } else {
      return res.json({
        error: true,
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    });
  }
};

const getCustomers = async (req, res) => {
  try {
    let customers;
    if (req.params.query === "all") {
      customers = await Customer.find(
        {},
        {
          password: 0,
        }
      );
    } else {
      customers = await Customer.findOne(
        { _id: req.params.query },
        {
          password: 0,
        }
      );
    }
    if (customers) {
      return res.json({
        error: false,
        message: "Fetched Successfully!",
        customer: customers,
      });
    } else {
      return res.json({
        error: true,
        message: "Something went wrong!",
        customer: undefined,
      });
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    let user = undefined;
    if (req.customer.role === "customer") {
      user = await Customer.findById(req.customer._id);
    }
    let token = req?.headers?.authorization?.split(" ")[1];
    if (user.token && user.token === token) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
      user.token = "";
      user
        .save()
        .then(() => {
          res.json({ error: false, message: "Password Updated Successfully!" });
        })
        .catch((err) => {
          res.json({ error: true, message: err.message });
        });
    } else {
      res.json({ error: true, message: "Something went wrong!" });
    }
  } catch (error) {
    res.json({ error: true, message: error.message });
  }
};

const deleteAccountByToken = async (req, res) => {
  try {
    const { _id } = req.customer;

    if (_id) {
      const result = await Customer.deleteOne({ _id });

      // Check if a document was deleted
      if (result.deletedCount > 0) {
        return res.json({
          error: false,
          message: "Account deleted successfully!",
        });
      } else {
        return res.json({
          error: true,
          message: "Customer not found or already deleted.",
        });
      }
    } else {
      return res.json({
        error: true,
        message: "Invalid request. No customer ID found.",
      });
    }
  } catch (error) {
    return res.json({
      error: true,
      message: error.message,
    });
  }
};

module.exports = {
  verifyOtp,
  handleSignup,
  handleSignIn,
  getCustomerProfileByToken,
  updateCustomerByToken,
  getCustomers,
  resetPassword,
  getCustomerById,
  deleteAccountByToken,
};
