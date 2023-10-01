const mongoose = require('mongoose');
const Inventory = require('../model/inventoryModel');

const schema = mongoose.Schema;

const soldSchema = new schema(
  {
    product_id: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

soldSchema.statics.sellItem = async function (id, quantity) {
  const exists = await Inventory.findOne({ _id: id });

  if (!exists) throw Error("Item doesn't exist.");

  if (exists.quantity < quantity) throw Error('Not enough items in inventory.');

  const soldItem = await this.create({
    product_id: id,
    quantity,
  });

  return soldItem;
};

module.exports = mongoose.model('Sold', soldSchema);
