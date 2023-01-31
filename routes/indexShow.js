const express = require("express")
const router = express.Router()
const { ensureAuth, ensureGuest } = require("../middleware/auth")

const Moods = require("../models/moods")

//Login/Landing Page
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  })
})

//Dashboard
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const moods = await Moods.find({ user: req.user.id }).lean()
    console.log(req.user.id)
    console.log(moods)
    res.render("dashboard", {
      name: req.user.firstName,
      moods,
    })
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

module.exports = router
