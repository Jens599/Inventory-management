const Inventory = require("../model/inventoryModel");
const User = require("../model/userModel");
const mongoose = require("mongoose");

// Create a new user
const addUser = async (req, res) => {
  const { username, name, email, phone, password } = req.body;

  // Check if the user already exists
  const existingUser = await User.find({ email: email });
  if (existingUser.length)
    return res.status(400).json({ error: "account already exists" });

  try {
    // Create a new user
    const inventory = await User.create({
      username,
      name,
      email,
      phone,
      password,
    });

    // Return the user
    res.status(200).json(inventory);
  } catch (error) {
    // Return an error there is one
    res.status(400).json({ error: error.message });
  }
};

// Find a user
const findUser = async (req, res) => {
  const { email, password } = req.body;

  // Find the user
  const user = await User.find({ email: email, password: password });

  // Return if user doesn't exist
  if (!user.length) return res.status(404).json({ userExists: false });

  // Return the user if it exists
  res.status(200).json({ userExists: true });
};

module.exports = {
  addUser,
  findUser,
};
