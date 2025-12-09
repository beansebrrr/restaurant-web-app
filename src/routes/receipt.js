import { Router } from "express";
const router = Router();
import BasketItem from "../models/basket.model.js";

router.route("/")
.get(async function (req, res) {
  let basketContents = await BasketItem.find({}).populate("item").exec();
  if (basketContents) {
    res.render("receipt/index", { foods: basketContents })
  }
})




export default router