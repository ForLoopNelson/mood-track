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

// Pre-save hook to set createdAtLocal to local time
StorySchema.pre('save', function (next) {
  // Convert the createdAt UTC timestamp to local time before saving
  const utcTime = this.createdAt || new Date(); // createdAt is automatically set by timestamps: true
  const offset = -4 * 60 * 60 * 1000; // Adjust this to match your timezone offset (e.g., UTC-4 hours for EDT)
  this.createdAtLocal = new Date(utcTime.getTime() + offset);
  next();
});

module.exports = mongoose.model("Story", StorySchema)
