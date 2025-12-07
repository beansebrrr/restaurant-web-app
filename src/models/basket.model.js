import mongoose from "mongoose";


const basketItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Food",
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

basketItemSchema.virtual("name").get(function () {
  this.populate("item");
  return this.item.name;
})

basketItemSchema.virtual("cost").get(function () {
  this.populate("item");
  return (this.item.price * this.quantity).toLocaleString("EN-ae", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
})


export default mongoose.model("BasketItem", basketItemSchema);