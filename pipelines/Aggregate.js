const Course = require("../models/course");

module.exports.Faculties = async (courseId) => {
  let doc;
  let pipeline = [
    {
      $lookup: {
        from: "faculties",
        localField: "_id",
        foreignField: "courseId",
        as: "faculties",
      },
    },
  ];
  let aggregation = await Course.aggregate(pipeline);
  aggregation.forEach((obj) => {
    if (obj.courseId === courseId) {
      doc = obj;
    }
  });
  return doc;
};
