import mongoose from "mongoose";
import path from "path";
const imagePath = "assets/images/food";

const foodSchema = new mongoose.Schema({
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
  imageName: {
    type: String,
    required: true,
  },
  imageType: {
    type: String,
    default: "webp"
  },
  imageSizes: {
    type: [Number],
    default: [240, 480, 720]
  },
});

foodSchema.virtual("imagePaths").get(function () {
  if (this.imageName != null) {
    let paths = []
    this.imageSizes.forEach(size => {
      let fileName = `${this.imageName}-${size}w.${this.imageType}`;
      let _ = {
        path: path.join("/", imagePath, fileName),
        size: size
      }
      paths.push(_)
    })
    return paths
  }
})


function roundOffToCash(money) {
  return Math.round(money * 100) / 100;
};


export default mongoose.model("Food", foodSchema);