import { Router } from "express";
import MenuItem from "../models/menu.model.js";
const router = Router()


router.route("/")
.get(function (req, res) {
  res.redirect("/")
})
.post(async function (req, res) {
  const menuItem = new MenuItem({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  })
  try {
    await menuItem.save();
  } catch {
  } finally {
    res.redirect("/")
  }
});


router.route("/new")
.get(function (req, res) {
  res.render("menu/new", { menuItem: new MenuItem() })
});


export default router   