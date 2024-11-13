//controller/authController.js
const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email, password });
    await user.save();

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '48h' });
    

    res.status(201).json({ token, user});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '48h' });
    const userId = user._id
    res.json({ token, userId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// New function to validate the token and check if user exists
exports.validateToken = async (req, res) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.status(200).json({ msg: 'Token is valid' , user});
  } catch (error) {
    console.error("Token validation error:", error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token expired' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ msg: 'Invalid token' });
    }
    res.status(500).json({ error: error.message });
  }
};