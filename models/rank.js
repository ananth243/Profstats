const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isMongoId } = require("validator");
const rankSchema = new Schema(
  {
    rank: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      required: true,
    },
    facid: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "faculties",
      validate: [isMongoId, "Must be a valid ObjectId"],
    },
  },
  { timestamps: true }
);

const Rank = mongoose.model("rank", rankSchema);
module.exports = Rank;
