import { Router } from "express";
import MenuItem from "../models/menu.model.js";
const router = Router()


router.route("/")
.get(async function (req, res) {
    const menuItems = await MenuItem.find({});
    res.render("menu/index", { items: menuItems });
})
.post(async function (req, res) {
  const menuItem = new MenuItem({
    name: req.body.name,
    price: req.body.price,
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
  res.render("menu/new", { menuItem: new MenuItem() });
});


router.route("/:id")
.get(async function (req, res) {
  const menuItem = await MenuItem.findById(req.params.id).exec();
  res.render("menu/view", { menuItem: menuItem });
})


export default router   