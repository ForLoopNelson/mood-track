const express = require("express")
const router = express.Router()
const { ensureAuth } = require("../middleware/auth")
const Moods = require("../models/moods")

//@desc Showw add page
//@Route GET /stories/add
router.get("/", ensureAuth, (req, res) => {
  res.render("stories/moods")
})

//@desc Process add form
//@Route POST 
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


//@desc Show all moods
router.get("/showMoods/:id", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    const moods = await Moods.find({ user: req.user.id })
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


// For looking back section to view past moods. Not to post
router.get("/showMoods/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id
    const moods = await Moods.find({ user: req.user.id })
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


// single mood test
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    
    let moods = await Moods.findOne({ _id: req.params.id }).populate("user").lean()

    if (!moods) {
      return res.render("error/404")
    }

    res.render(`stories/moodIndex/:id`, {
      moods,
    })
  } catch (err) {
    console.error(err)
    res.render("error/devError")
  }
})




//@desc Delete story
//@Route DELETE /stories/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Moods.deleteOne({ _id: req.params.id })
    res.redirect(`/moods/showMoods/${req.user.id}`)
  } catch (err) {
    console.error(err)
    return res.render("error/500")
  }
})


module.exports = router
