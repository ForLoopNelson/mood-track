const mongoose = require("mongoose")

const MoodsSchema = new mongoose.Schema({
  status: {
    type: String,
    default: "neutral",
    enum: ["good", "neutral", "bad"],
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",

    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Moods", MoodsSchema)
