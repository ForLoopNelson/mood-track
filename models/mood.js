//This is not in use yet!

const mongoose = require("mongoose")

const MoodSchema = new mongoose.Schema({
  motd: {
    type: String,
    required: true,
    //trims any whitespace
    trim: true,
  },
  overallMood: {
    type: String,
    required: true,
    trim: true,
  },

  notes: {
    type: String,
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

module.exports = mongoose.model("Mood", MoodSchema)
