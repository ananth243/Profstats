const express = require("express");
const mongoose = require("mongoose");
const Faculty = require("./models/faculty");
const Course = require("./models/course");

const app = express();

const dbURI =
  "mongodb+srv://mm_mohitt:tourmaline6515@cluster0.dgakx.mongodb.net/oauth?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen("8080");
    console.log("Connected to db");
  })
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  Faculty.find()
    .sort()
    .then((result) => {
      res.render("faculty", { title: "Faculty info", faculty: result });
    })
    .catch((err) => console.log(err));
});

app.get("/courses", (req, res) => {
  Course.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("course", { title: "Course info", course: result });
    })
    .catch((err) => console.log(err));
});
app.get("/add", (req, res) => {
  res.render("add", { title: "Add faculty" });
});

app.post("/add", (req, res) => {
  const faculty = new Faculty(req.body);
  faculty
    .save()
    .then((result) => res.redirect("/"))
    .catch((err) => console.log(err));
});

app.get("/add/course", (req, res) => {
  res.render("course-add", { title: "Add Course" });
});

app.post("/add/course", (req, res) => {
  const course = new Course(req.body);
  course
    .save()
    .then((result) => res.redirect("/courses"))
    .catch((err) => console.log(err));
});
