const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const itemSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  pictures: {
    type: [String],
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["CLOTHE", "SHOE", "ACCESSORY"],
  },
  sex: {
    type: String,
    required: true,
    enum: ["MALE", "FEMALE", "MIXED"],
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const ItemModel = model("Item", itemSchema);

module.exports = ItemModel;
