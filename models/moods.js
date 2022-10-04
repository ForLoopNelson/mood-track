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
    //!Change: this field should be required because the app will break if the user is not present.
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Moods", MoodsSchema)
