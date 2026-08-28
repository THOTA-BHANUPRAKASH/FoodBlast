const Customer = require("../models/customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const customerRegister = async (req, res) => {
  try {
    const { customerName, email, password } = req.body;

    if (!customerName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingCustomer = await Customer.findOne({ email });

    if (existingCustomer) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = new Customer({
      customerName,
      email,
      password: hashedPassword,
    });

    await customer.save();

    res.status(201).json({
      message: "Customer registered successfully",
      customer: {
        id: customer._id,
        customerName: customer.customerName,
        email: customer.email,
      },
    });
  } catch (error) {
    console.log("Customer registration error:", error);

    res.status(500).json({
      message: "Customer registration failed",
    });
  }
};

const customerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(password, customer.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        customerId: customer._id,
      },
      process.env.jwt_secrectKey,
      {
        expiresIn: "1d",
      },
    );

    res.cookie("customerToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Customer login successful",
      customer: {
        id: customer._id,
        customerName: customer.customerName,
        email: customer.email,
      },
    });
  } catch (error) {
    console.log("Customer login error:", error);

    res.status(500).json({
      message: "Customer login failed",
    });
  }
};

const customerMe = async (req, res) => {
  try {
    const customer = await Customer.findById(req.customerId).select(
      "-password",
    );

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json({
      customer: {
        id: customer._id,
        customerName: customer.customerName,
        email: customer.email,
      },
    });
  } catch (error) {
    console.log("Customer me error:", error);

    res.status(500).json({
      message: "Failed to get customer",
    });
  }
};

const customerLogout = (req, res) => {
  try {
    res.clearCookie("customerToken", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "Customer logout successful",
    });
  } catch (error) {
    console.log("Customer logout error:", error);

    res.status(500).json({
      message: "Logout failed",
    });
  }
};

module.exports = {
  customerRegister,
  customerLogin,
  customerMe,
  customerLogout,
};
