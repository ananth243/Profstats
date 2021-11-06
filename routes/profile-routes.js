const router = require("express").Router();
const Course = require("../models/course");
const Faculty = require("../models/faculty");
const Rank = require("../models/rank");
const { Faculties } = require("../pipelines/Aggregate");

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("auth/login");
  } else {
    next();
  }
};

router.get("/", (req, res) => {
  Course.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { user: req.user, title: "Welcome", course: result });
    })
    .catch((err) => console.log(err));
});

router.get("/:id", async (req, res) => {
  let doc;
  const { id } = req.params;
  const courseId = id.slice(0, 4) + " " + id.slice(5, 9);
  doc = await Faculties(courseId);
  const { _id } = await Course.findOne({ courseId });
  pipeline = [
    {
      $lookup: {
        from: "ranks",
        localField: "_id",
        foreignField: "facid",
        as: "rank",
      },
    },
    {
      $addFields: {
        rating: {
          $avg: "$rank.rank",
        },
      },
    },
    {
      $match: {
        $expr: {
          $eq: ["$courseId", _id],
        },
      },
    },
  ];
  aggregation = await Faculty.aggregate(pipeline);
  aggregation.forEach((fac) => {
    delete fac.rank;
  });
  res.render("course", {
    user: req.user,
    courseId,
    doc,
    aggregation
  });
});

module.exports = router;
