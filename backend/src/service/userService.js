const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (userData) => {
  const existing = await User.findOne({ email: userData.email });
  if (existing) throw new Error('Email already exists');
  const hashed = await bcrypt.hash(userData.password, 10);
  const user = new User({ ...userData, password: hashed });
  return await user.save();
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid password');
  const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  return { user, token };
};

const getAllUsers = async () => {
  return await User.find();
};

const getUserById = async (id) => {
  return await User.findById(id);
};

const updateUser = async (id, updatedData) => {
  return await User.findByIdAndUpdate(id, updatedData, { new: true });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
