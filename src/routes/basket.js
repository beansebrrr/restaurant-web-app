import { Router } from "express";
import { addToBasket, removeFromBasket } from "../controllers/basket.controller.js";
import BasketItem from "../models/basket.model.js"
import MenuItem from "../models/menu.model.js"
const router = Router()


router.route("/")
.get(async function (req, res) {
  const basketItems = await BasketItem.find({}).populate("item").exec();
  res.render("basket/index", { basketItems: basketItems });
})
.post(async function (req, res) {
  try {
    if (!req.body.itemID) {
      throw Error("Can't reference the item ID");
    };
    const item = await MenuItem.findById(req.body.itemID);
    
    addToBasket(item, req.body.quantity);
    
    res.send(`Added to basket!`);
  } catch (error) {
    console.log(error);
  }
});


router.route("/:id")
.put(async function (req, res) {
  let basketItem;
  
  try {
    basketItem = await BasketItem.findById(req.params.id).populate("item").exec();
    basketItem.quantity = parseInt(req.body.quantity);
    await basketItem.save();
    removeFromBasket(basketItem);
    res.render("partials/basket-item.ejs", { item: basketItem })
  } catch {
    res.send("")
  }
  // res.send(req.body)
})


export default router
