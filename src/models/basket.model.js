import mongoose from "mongoose";

const basketItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "MenuItem",
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
});

basketItemSchema.methods.adjustQuantity = function(amount=1) {
  if (isNaN(amount)) {
    throw Error("Increment/decrement amount has no value")
  }
  this.quantity += amount;
  return this.save();
};

export default mongoose.model("BasketItem", basketItemSchema);