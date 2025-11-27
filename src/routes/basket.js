import { Router } from "express";
import { addToBasket } from "../controllers/basket.controller.js";
import MenuItem from "../models/menu.model.js"
const router = Router()


router.route("/")
.post(async function (req, res) {
  try {
    if (!req.body.itemID) {
      throw Error("Can't reference the item ID");
    };
    const item = await MenuItem.findById(req.body.itemID).exec();

    addToBasket(item);

    res.send(`Added ${item.name} to basket!`);
  } catch (error) {
    
  }
});


export default router
