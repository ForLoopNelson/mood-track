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
// Test file to get user to be able to show one Mood like you can with Public Stories
//Dashboard
router.get("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
   const moods = await Moods.find({ user: req.user.id })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean()
    res.render("moods/moodsIndex", {
      moods,
    })
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

//@desc Show single story
//@Route GET /moods/:id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let moods = await Moods.findById(req.params.id).populate("user").lean()

    if (!moods) {
      return res.render("error/404")
    }

    res.render("moods/show", {
      story,
    })
  } catch (err) {
    console.error(err)
    res.render("error/404")
  }
})

//@desc Show edit page
//@Route GET /moods/edit/:id
// router.get("/edit/:id", ensureAuth, async (req, res) => {
//   try {
//     const story = await Story.findOne({
//       _id: req.params.id,
//     }).lean()

//     if (!story) {
//       return res.render("error/404")
//     }

//     if (story.user != req.user.id) {
//       res.redirect("/stories")
//     } else {
//       res.render("stories/edit", {
//         story,
//       })
//     }
//   } catch (err) {
//     console.error(err)
//     return res.render("error/500")
//   }
// })

module.exports = router
