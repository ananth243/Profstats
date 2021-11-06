const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "courses",
    },
  },
  { timestamps: true }
);

const Faculty = mongoose.model("faculty", facSchema);
module.exports = Faculty;
