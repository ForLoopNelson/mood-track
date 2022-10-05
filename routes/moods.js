const express = require("express")
const router = express.Router()
const { ensureAuth } = require("../middleware/auth")

const Moods = require("../models/Moods")

//@desc Showw add page
//@Route GET /stories/add
router.get("/", ensureAuth, (req, res) => {
  res.render("stories/moods")
})

//@desc Process add form
//@Route POST /stories
router.post("/postMoods", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    await Moods.create(req.body)
    res.redirect(`/moods/showMoods/${req.user.id}`)
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

//@desc Show all public stories
//@Route GET /stories
router.get("/showMoods/:id", ensureAuth, async (req, res) => {
  try {
    const moods = await Moods.find({})
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean()
    res.render("stories/showMoods", {
      moods,
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
    let moods = await Moods.findById(req.params.id).populate("user").lean()

    if (!moods) {
      return res.render("error/404")
    }

    res.render("/moods", {
      moods,
    })
  } catch (err) {
    console.error(err)
    res.render("error/404")
  }
})

//@desc Delete story
//@Route DELETE /stories/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Moods.remove({ _id: req.params.id })
    res.redirect(`/moods/showMoods/${req.user.id}`)
  } catch (err) {
    console.error(err)
    return res.render("error/500")
  }
})

// @desc    User stories
// @route   GET /stories/user/:userId
// router.get("/user/:userId", ensureAuth, async (req, res) => {
//   try {
//     const moods = await Moods.find({}).populate("user").lean()

//     res.render("stories/moodIndex", {
//       moods,
//     })
//   } catch (err) {
//     console.error(err)
//     res.render("error/500")
//   }
// })

module.exports = router
