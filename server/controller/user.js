const User = require("../models/User");
const { validateEmail, validateLength } = require("../helpers/validation");
const { generateToken } = require("../helpers/tokens");
const { sendVerificationEmail } = require("../helpers/mail");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    password,
    gender,
    bYear,
    bMonth,
    bDay,
  } = req.body;

  if (!validateEmail(email)) {
    res.status(400).json({ error: "Invalid email" });
    return;
  }

  const check = await User.findOne({ email });
  if (check) {
    res.status(400).json({
      error:
        "User already exists with this email, try a different email address",
    });
    return;
  }

  if (!validateLength(firstname, 3, 30)) {
    res.status(400).json({
      error: "Firstname length must be between 3-30 characters",
    });
    return;
  }

  if (!validateLength(password, 6, 40)) {
    res.status(400).json({
      error: "Password must be at least 6 characters",
    });
    return;
  }

  const bcryptedPassword = await bcrypt.hash(password, 12);
  let generatedUsername;

  if (username) {
    generatedUsername = username;
  } else {
    generatedUsername = `${firstname.toLowerCase()}${lastname.toLowerCase()}${new Date().getFullYear()}`;
  }

  try {
    const newUser = new User({
      firstname,
      lastname,
      username: generatedUsername,
      email,
      password: bcryptedPassword,
      gender,
      bYear,
      bMonth,
      bDay,
    });
    const user = await newUser.save();
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );
    const token = generateToken({ id: user._id.toString() }, "7d");
    const emailVerificationURL = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(email, firstname, emailVerificationURL);
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      firstname: user.firstname,
      lastname: user.lastname,
      token: token,
      verified: user.verified,
      message: "Register Success ! please activate your email to start",
    });
    // res.json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const activateAccount = async (req, res) => {
  const { token } = req.body;
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  console.log(user);
  const check = await User.findById(user.id);
  if (check.verified == true) {
    return res.status(400).json({ message: "Already verified email" });
  } else {
    await User.findByIdAndUpdate(user.id, { verified: true });
    return res.status(200).json({ message: "Verified succesfully" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "the email address you entered is not currently connected",
      });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ message: "incorrect password" });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    return res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      firstname: user.firstname,
      lastname: user.lastname,
      token: token,
      verified: user.verified,
      message: "Succesfully connected",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, activateAccount, login };
