const mongoose = require("mongoose")

const StorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      //trims any whitespace
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "public",
      enum: ["public", "private"],
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

      //for later test. remove the createdAt in story and moods to test created at and updated at times and see if the corrects the bug
    },
  }, //attempt timeStamp
  { timestamps: true }
)

module.exports = mongoose.model("Story", StorySchema)
