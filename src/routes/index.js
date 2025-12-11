import { Router } from "express";
const router = Router()

import Food from "../models/food.model.js"


router.route("/")
.get(async function (req, res) {
  try {
    const foods = await Food.find({})
    res.render("index.ejs", { foods })
  } catch {
    
  }
})


export default router