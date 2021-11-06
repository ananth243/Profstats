const router = require("express").Router();
const Course = require("../models/course");
const Faculty = require("../models/faculty");
const Rank = require("../models/rank");
const { Faculties } = require("../pipelines/Aggregate");
const { route } = require("./form-routes");

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect("auth/login");
  } else {
    next();
  }
};

router.use(authCheck);

router.get("/", (req, res) => {
  Course.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { user: req.user, title: "Welcome", course: result });
    })
    .catch((err) => console.log(err));
});

router.get("/:id", async (req, res, next) => {
  try {
    let doc;
    const { id } = req.params;
    const courseId = id.slice(0, 4) + " " + id.slice(5, 9);
    const course = await Course.findOne({ courseId });
    if (course) {
      const { _id } = course;
      doc = await Faculties(courseId);
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
        aggregation,
      });
    } else {
      let error = new Error("Course not found");
      error.status = 404;
      throw error;
    }
  } catch (err) {
    res.status(404).render("404", { title: "Error" });
  }
});

module.exports = router;
