const mongoose = require("mongoose")

const MoodsSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "neutral",
    enum: ["good", "neutral", "bad"],
    required: true,
  },
  colors: {
    type: String,
    neutral: "#8DBAFF",
    good: "#50E45E",
    bad: "#F10808",
  },

  body: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,

    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Moods", MoodsSchema)
