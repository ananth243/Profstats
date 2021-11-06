const router = require("express").Router();
const Rank = require("../models/rank");
const Faculty = require("../models/faculty");
const { Faculties } = require("../pipelines/Aggregate");

router.use((req, res, next) => {
  if (parseInt(req.user.email.slice(1, 5)) === 2020) {
    res.redirect("/profile");
  } else {
    next();
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const courseId = id.slice(0, 4) + " " + id.slice(5, 9);
  const faculty = await Faculties(courseId);
  res.render("form", {
    user: req.user,
    courseId,
    year: req.user.email.slice(1, 5),
    faculty: faculty.faculties,
  });
});

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const courseId = id.slice(0, 4) + " " + id.slice(5, 9);
    if (courseId === req.body.courseId) {
      for (const property in req.body) {
        if (property.length === 24) {
          const rank = new Rank({
            rank: parseInt(req.body[property]),
            facid: property,
          });
          await rank.save();
        }
      }
      res.redirect(`/profile/${courseId}`);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
