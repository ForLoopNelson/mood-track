const express = require("express")
const router = express.Router()
const { ensureAuth } = require("../middleware/auth")

router.get("/", ensureAuth, (req, res) => {
  res.render("stories/zen")
})




module.exports = router