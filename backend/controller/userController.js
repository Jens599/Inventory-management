const User = require('../model/userModel');

const jwt = require('jsonwebtoken');

const privateKey = 'QMBjH^846j&$$71Hf62m';

const createToken = (_id) => {
  return jwt.sign({ _id }, privateKey, { expiresIn: '3d' });
};

// Create a new user
const addUser = async (req, res) => {
  const { username, name, email, phone, password } = req.body;

  try {
    const user = await User.signup(username, name, email, phone, password);

    const token = createToken(user.id);

    res.status(200).json({ Message: user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Find a user
const findUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user.id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addUser,
  findUser,
};
