import { Router } from "express";
const router = Router()

import MenuItem from "../models/menuItem.js"


router.route("/")
.get(async function (req, res) {

  try {
    const menuItems = await MenuItem.find({})
    res.render("index.ejs", { menuItems })
  } catch {
    
  }

})


export default router