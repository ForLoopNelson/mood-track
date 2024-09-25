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
   
  }, //attempt timeStamp
  { timestamps: true }
)



module.exports = mongoose.model("Story", StorySchema)
