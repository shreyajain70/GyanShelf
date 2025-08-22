const UserValidation = require("../MiddleWare/Validation");
const SignUpSchema = require("../models/SignUpSchema");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

// load env vars
require("dotenv").config();

router.post("/", async (req, res) => {
  try {
    const { EmailID, Password } = req.body;

    const EmailUser = await SignUpSchema.findOne({ EmailID });
    if (!EmailUser) {
      return res.status(404).json({ message: "Email user does not exist" });
    }

    const PasswordUser = await bcrypt.compare(Password, EmailUser.Password);

    if (!PasswordUser) {
      return res.status(401).json({ message: "EmailID or Password is Invalid" });
    }

    // ✅ create token
    const token = jwt.sign(
      { _id: EmailUser._id },
      process.env.JWT_SECRET || "fallbackSecret",
      { expiresIn: "1h" }
    );

    // send back token + userId
    res.status(200).json({
      message: "Login Successful",
      token,
      userId: EmailUser._id,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
