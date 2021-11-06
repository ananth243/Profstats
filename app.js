const express = require("express");
require("dotenv").config();
const formRoutes = require("./routes/form-routes");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes");
require("./config/passport-setup");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const morgan = require("morgan");
const app = express();
app.set("view engine", "ejs");

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

mongoose
  .connect(process.env.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => {
    console.log(err);
  });

app.listen(port, function () {
  console.log("Server started");
});

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/profile/form", formRoutes);

app.get("/", (req, res) => {
  res.render("homepage", { title: "Homepage" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Error" });
});
