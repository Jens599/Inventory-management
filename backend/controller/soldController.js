const Sold = require('../model/soldModel');
const mongoose = require('mongoose');

const sellItem = async (req, res) => {
  const { product_id, quantity } = req.body;

  try {
    const sold = await Sold.sellItem(product_id, quantity);

    res.status(200).json(sold);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { sellItem };
