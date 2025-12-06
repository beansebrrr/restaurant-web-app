import { Router } from "express";
import Food from "../models/food.model.js";
const router = Router()


router.route("/")
.get(async function (req, res) {
    const menuItems = await Food.find({});
    res.render("menu/index", { items: menuItems });
})
.post(async function (req, res) {
  const menuItem = new Food({
    name: req.body.name,
    price: req.body.price,
    imageName: req.body.imageName,
    description: req.body.description
  })
  try {
    await menuItem.save();
  } catch (error) {
    console.error(error);
  } finally {
    res.redirect("/");
  }
});


router.route("/new")
.get(function (req, res) {
  res.render("menu/new", { menuItem: new Food() });
});


router.route("/:id")
.get(async function (req, res) {
  const menuItem = await Food.findById(req.params.id).exec();
  res.render("menu/view", { menuItem: menuItem });
})


export default router   