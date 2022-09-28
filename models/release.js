const mongoose = require("mongoose")

const ReleaseSchema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "private",
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

module.exports = mongoose.model("Release", ReleaseSchema)
