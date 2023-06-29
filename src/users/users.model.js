const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  isDelete: {
    type: Boolean,
    required: false,
    default: false,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    select: false,
  },
  address: {
    type: String,
    trim: true,
    required: false,
  },
  roles: {
    type: [String],
    required: true,
    enum: ["MEMBER", "ADMIN"],
    default: "MEMBER",
  },
});

const UserModel = model("User", userSchema);

module.exports = UserModel;
