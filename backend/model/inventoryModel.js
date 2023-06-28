const mongoose = require("mongoose");

const schema = mongoose.Schema;

const inventorySchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    style: {
      type: String,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    purchasePrice: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
      default: true,
    },
    salesPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("inventory", inventorySchema);
