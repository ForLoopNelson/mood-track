const express = require("express")
const router = express.Router()
const { ensureAuth } = require("../middleware/auth")

const Moods = require("../models/moods")

//attempt get for moodIndex
// router.get("/moodIndex/:id", ensureAuth, async (req, res) => {
//   try {
//     const moods = await Moods.find({})
//       .populate("user")
//       .sort({ createdAt: "desc" })
//       .lean()
//     res.render(`stories/moodIndex/`, {
//       moods,
//     })
//   } catch (err) {
//     console.error(err)
//     res.render("error/500")
//   }
// })

//@desc Showw add page
//@Route GET /moodIndex/add
router.get("/", ensureAuth, (req, res) => {
  res.render("stories/moodIndex")
})

// @desc Process add form
// @Route POST /stories
// router.get("/", ensureAuth, async (req, res) => {
//   try {
//     req.body.user = req.user.id
//     await Moods.create(req.body)
//     res.redirect(`/moodIndex/${req.user.id}`)
//   } catch (err) {
//     console.error(err)
//     res.render("error/500")
//   }
// })

//@desc Show all past moods
//@Route GET /stories
router.get("/moodIndex/:id", ensureAuth, async (req, res) => {
  try {
    const moods = await Moods.find({})
      .lean()
      .populate("user")
      .sort({ createdAt: "desc" })
    console.log(req.user.id)
    console.log(moods)
    res.render(`stories/moodIndex/${req.user.id}`, {
      moods,
    })
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

// @desc Show single story
// @Route GET /stories/:id
router.get("/:id", ensureAuth, async (req, res) => {
  try {
    let mood = await Moods.findById(req.params.id).populate("user").lean()

    if (!mood) {
      return res.render("error/404")
    }

    res.render("/moods", {
      mood,
    })
  } catch (err) {
    console.error(err)
    res.render("error/404")
  }
})

//@desc Show edit page
//@Route GET /moodIndex/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
  try {
    const mood = await Moods.findOne({
      _id: req.params.id,
    }).lean()

    if (!mood) {
      return res.render("error/404")
    }

    if (mood.user != req.user.id) {
      res.redirect("moodIndex")
    } else {
      res.render("/moodIndex/edit", {
        mood,
      })
    }
  } catch (err) {
    console.error(err)
    return res.render("error/500")
  }
})

//@desc Update Story
//@Route PUT /stories/:id
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    let mood = await Moods.findById(req.params.id).lean()

    if (!mood) {
      return res.render("error/404")
    }

    if (mood.user != req.user.id) {
      res.redirect("stories/moodIndex")
    } else {
      mood = await Moods.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      })

      res.redirect("/dashboard")
    }
  } catch (err) {
    console.error(err)
    return res.render("error/500")
  }
})

//@desc Delete story
//@Route DELETE /stories/:id
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Moods.remove({ _id: req.params.id })
    res.redirect("/dashboard")
  } catch (err) {
    console.error(err)
    return res.render("error/500")
  }
})

// @desc    User stories
// @route   GET /stories/user/:userId
router.get("/user/:userId", ensureAuth, async (req, res) => {
  try {
    const moods = await Moods.find({
      user: req.params.userId,
    })
      .populate("user")
      .lean()

    res.render("moodIndex", {
      moods,
    })
  } catch (err) {
    console.error(err)
    res.render("error/500")
  }
})

module.exports = router
