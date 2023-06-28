const Inventory = require('../model/inventoryModel');
const mongoose = require('mongoose');

// Get all items from the database
const getAll = async (req, res) => {
  const inventory = await Inventory.find({}).sort({ createdAt: -1 });

  res.status(200).json(inventory);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).json({ error: 'No such Product ID In Inventory' });

  const inventory = await Inventory.findById({ _id: id });

  inventory
    ? res.status(200).json(inventory)
    : res.status(400).json({ error: 'no such inventory item' });
};

// Add a new item to the database
const addItem = async (req, res) => {
  const {
    name,
    brand,
    category,
    style,
    supplier,
    purchasePrice,
    quantity,
    availability,
    salesPrice,
  } = req.body;

  try {
    const inventory = await Inventory.create({
      name,
      brand,
      category,
      style,
      supplier,
      purchasePrice,
      quantity,
      availability,
      salesPrice,
    });

    res.status(200).json(inventory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Remove an item from the database
const removeItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(404).json({ error: 'No such Product ID In Inventory' });

  const inventory = await Inventory.findOneAndDelete({ _id: id });

  if (!inventory)
    return res.status(404).json({ error: 'No such Product In Inventory' });

  res.status(200).json(inventory);
};

const updateItem = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: 'no Such item in Inventory' });

  const inventory = await Inventory.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!inventory)
    return res.status(404).json({ error: 'No Such inventory item' });

  res.status(200).json(inventory);
};

// Export the functions
module.exports = {
  getAll,
  getOne,
  addItem,
  removeItem,
  updateItem,
};
