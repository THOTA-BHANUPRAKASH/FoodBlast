const express = require("express");

const router = express.Router();

const customerAuth = require("../middlewares/customerAuth");

const {
  customerRegister,
  customerLogin,
  customerMe,
  customerLogout,
} = require("../controllers/customerController");

router.post("/register", customerRegister);

router.post("/login", customerLogin);

router.get("/me", customerAuth, customerMe);
router.post("/logout", customerAuth, customerLogout);

module.exports = router;
