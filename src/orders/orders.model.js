const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const orderSchema = new Schema({
  itemsIds: [
    {
      type: { itemId: Types.ObjectId, quantity: Number },
      required: true,
      ref: "Item",
      trim: true,
    },
  ],
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: "User",
    trim: true,
  },
  status: {
    type: String,
    enum: [
      "PENDING",
      "ARRIVED",
      "CANCELED",
      "PENDING_BACK",
      "SEND_BACK",
      "CLEANING",
    ],
    default: "PENDING",
    required: true,
  },
  address: {
    type: String,
    required: false,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  sendBackDate: {
    type: Date,
    required: false,
    default: null,
  },
});

const OrderModel = model("Order", orderSchema);

module.exports = OrderModel;
