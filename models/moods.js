const mongoose = require("mongoose")

const MoodsSchema = new mongoose.Schema({
  goodMood: {
    type: Boolean,
    required: false,
  },
  neutralMood: {
    type: Boolean,
    required: false,
  },
  badMood: {
    type: Boolean,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    //!Change: this field should be required because the app will break if the user is not present.
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Moods", MoodsSchema)
