const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
const Customer = require("../models/customer");

dotEnv.config();

const secretkey = process.env.jwt_secrectKey;

const customerAuth = async (req, res, next) => {
  try {
    const { customerToken } = req.cookies;

    if (!customerToken) {
      return res.status(401).json({
        message: "Please login!",
      });
    }

    const decoded = jwt.verify(customerToken, secretkey);

    const customer = await Customer.findById(decoded.customerId);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    req.customerId = customer._id;

    next();
  } catch (error) {
    console.error("Customer authentication error:", error);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = customerAuth;
