const vendorController = require("../controllers/vendorController");
const express = require("express");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/register", vendorController.vendorRegistraion);
router.post("/login", vendorController.vendorLogin);
router.post("/logout", vendorController.vendorLogout);
router.get("/all-vendors", vendorController.getAllVendors);
router.get("/single-vendor/:id", vendorController.getVendorById);
router.get("/vendor-firms", verifyToken, vendorController.getVendorFirms);
router.get("/loggedInvendor", verifyToken, vendorController.getLoggedInVendor);
module.exports = router;
