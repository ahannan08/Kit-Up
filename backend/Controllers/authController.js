import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../Schemas/userSchema.js';
import { env } from '../config/env.js';

const Register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, balance: 1500 });
  await user.save();

  res.status(201).json({ message: 'User registered successfully' });
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id }, env.jwtSecret, { expiresIn: '7d' });

  res.status(200).json({
    message: 'Login successful',
    user: {
      userId: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
      token,
    },
  });
};

const getMe = async (req, res) => {
  const user = await User.findById(req.auth.userId).select('-password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({
    user: {
      userId: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance,
    },
  });
};

export { Login, Register, getMe };
