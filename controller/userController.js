const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// login user
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, verified: true });
    if (!user) {
      return res.status(404).json({ message: "User not found or not verified" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate and send token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      // expiresIn: '1h' // Token expiration time
    });
    
    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// register user
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with same email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verified: true,
    });
    await newUser.save();

    // Generate and send token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      // expiresIn: '1h' // Token expiration time
    });
    
    res.status(201).json({ token, userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { loginController, registerController };
