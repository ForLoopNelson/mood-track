const express = require("express")
const router = express.Router()
const { ensureAuth } = require("../middleware/auth")

const Release = require("../models/release")

//@desc Showw add page
//@Route GET /stories/add
router.get("/", ensureAuth, (req, res) => {
  res.render("stories/release")
})

//@desc Process add form
//@Route POST /release
router.post("/postRelease", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    const releaseText = await Release.create(req.body)
    res.redirect(`/release/showRelease/${releaseText._id}`)
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

//@desc Show all public stories
//@Route GET /stories
router.get("/showRelease/:id", ensureAuth, async (req, res) => {
  try {
    const letItGo = await Release.findOne({ _id: req.params.id })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean()
    res.render("stories/show-release", {
      letItGo,
    })
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

//@desc Show single story
//@Route GET /stories/:id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let release = await Release.findOne({ _id: req.params.id }).populate("user").lean()

    if (!release) {
      return res.render("error/404")
    }

    res.render("/release", {
      release,
    })
  } catch (err) {
    console.error(err)
    res.render("error/404")
  }
})


module.exports = router
