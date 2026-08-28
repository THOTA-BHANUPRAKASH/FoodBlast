const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");

dotEnv.config();
const secretkey = process.env.jwt_secrectKey;

const vendorRegistraion = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const vendorEmail = await Vendor.findOne({ email });
    if (vendorEmail) {
      return res.status(400).json("email already exist");
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newVendor = new Vendor({
      username,
      email,
      password: hashedPassword,
    });

    await newVendor.save();

    res.status(201).json({ message: `${username} registered sucessfully` });
    console.log("registred");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
      return res.status(401).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign({ vendorId: vendor._id }, secretkey, {
      expiresIn: "1d",
    });
    res.cookie("token", token);

    res.status(200).json({ sucess: "Login Sucessfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const vendorLogout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: "Logout Successfully",
  });
};

const getAllVendors = async (req, res) => {
  try {
    const vendor = await Vendor.find().populate("firm");
    res.json({ vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getVendorById = async (req, res) => {
  const vendorId = req.params.id;
  try {
    const vendor = await Vendor.findById(vendorId).populate("firm");
    if (!vendor) {
      return res.status(404).json({ error: "vendor is not found" });
    }
    res.status(200).json({ vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getVendorFirms = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendorId).populate(
      "firm",
      "firmName area offer category region",
    );

    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    res.status(200).json({ vendor });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getLoggedInVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.vendorId).populate("firm");

    if (!vendor) {
      return res.status(404).json({
        message: "Vendor not found",
      });
    }

    res.status(200).json({
      vendor,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = {
  vendorRegistraion,
  vendorLogin,
  vendorLogout,
  getAllVendors,
  getVendorById,
  getVendorFirms,
  getLoggedInVendor,
};
