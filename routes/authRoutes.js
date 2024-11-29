const express = require("express");
const {
  registerConstroller,
  loginConstroller,
} = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", registerConstroller);
router.post("/login", loginConstroller);

module.exports = router;
