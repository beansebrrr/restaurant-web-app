import { Router } from "express";
const router = Router();
import BasketItem from "../models/basket.model.js";

router.route("/")
.get(async function (req, res) {
  let basketContents = await BasketItem.find({}).populate("item").exec();
  if (basketContents.length > 0) {
    res.render("receipt/index", { foods: basketContents })
  } else {
    res.redirect("/basket")
  }
})


export default router