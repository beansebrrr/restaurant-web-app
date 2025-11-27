import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    set: roundOffToCash,
  },
  description: String,
});


function roundOffToCash(money) {
  return Math.round(money * 100) / 100;
};


export default mongoose.model("MenuItem", menuItemSchema);