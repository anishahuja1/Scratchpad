const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

// @route POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { emailOrPhone, password, name } = req.body;
    
    const userExists = await User.findOne({ emailOrPhone });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    const user = await User.create({ emailOrPhone, password, name });
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      emailOrPhone: user.emailOrPhone,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /api/auth/login
// Mocking the OTP step, we will just login with password, but UI has OTP. We'll simulate it.
router.post('/login', async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    
    const user = await User.findOne({ emailOrPhone }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // In a real app, send OTP here. We'll just return a success message to indicate OTP sent.
    user.otp = '123456'; // mock OTP
    await user.save();
    
    res.json({ message: 'OTP sent successfully (mock: 123456)', emailOrPhone: user.emailOrPhone });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  try {
    const { emailOrPhone, otp } = req.body;
    
    const user = await User.findOne({ emailOrPhone });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.otp !== otp && otp !== '123456') {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    // clear otp
    user.otp = undefined;
    await user.save();
    
    res.json({
      _id: user._id,
      name: user.name,
      emailOrPhone: user.emailOrPhone,
      token: generateToken(user._id),
      avatar: user.avatar
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
