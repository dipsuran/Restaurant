const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerConstroller = async (req, res) => {
  try {
    const { username, email, password, phone, answer, address } = req.body;
    //validation...
    if (!username || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const exisiting = await userModel.findOne({ email });
    if (exisiting) {
      return res.status(500).send({
        success: false,
        message: "Email Already Registerd please Login",
      });
    }
    // Password hash
    const hash = bcrypt.hashSync(password, 10);

    // create user
    const user = await userModel.create({
      username,
      email,
      password: hash,
      phone,
      answer,
      address,
    });

    res.status(201).send({
      success: true,
      message: "Successfully Registerd",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};
const loginConstroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation...
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please Provide Email and Password",
      });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Note Found",
      });
    }
    const isAuth = bcrypt.compareSync(password, user.password);
    if (!isAuth) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};

module.exports = { registerConstroller, loginConstroller };
