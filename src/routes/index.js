import { Router } from "express";
const router = Router()


router.route("/")
.get(function (req, res) {
  try {
    res.render("index")
  } catch (error) {
    res.send(error)
  }
})


export default router