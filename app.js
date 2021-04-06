const express = require("express");
const formRoutes = require("./routes/form-routes");
const authRoutes = require("./routes/auth-routes");
const profileRoutes = require("./routes/profile-routes"); //These are the routes after the user has signed in
const passportSetup = require("./config/passport-setup"); //These are the authentication routes
const mongoose = require("mongoose");
const keys = require("./config/keys"); //You will have to create a keys folder as given in the README file
const cookieSession = require("cookie-session"); //This gives a session time for the user /and for now its 15 minutes
const passport = require("passport");
const Course = require("./models/course"); //This is the folder that contains alll the models
const morgan = require("morgan"); //The middleware that this app is using

const app = express();

app.set("view engine", "ejs");
//app.listen("3000");
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Server started");
});

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, //If the user is on the website within the profile routes for more than 15 minutes he/she gets logged out automatically
    keys: [keys.session.cookieKey],
  })
);

app.use(passport.initialize()); //Initialises the cookie session
app.use(passport.session()); //This logs the user out if the session has expired
app.use(express.static("public")); //Allows the logo and .png to be publiv. Try localhost:3000/cool-background.png to check it out
app.use(morgan("tiny")); //You will observe the sort of requests being made in the terminal
app.use(express.urlencoded({ extended: true }));

// connect to mongodb
mongoose.connect(
  keys.mongodb.dbURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } /*Stops the decripation warnings as it is under development*/,
  () => {
    console.log("connected to mongodb");
  }
);

// set up routes
//Usong the express router
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);
app.use("/profile/form", formRoutes);

app.get("/", (req, res) => {
  res.render("homepage", { title: "Homepage" });
});

//IN case user visits unknown url. Try localhost:3000/hyadvhjvsdhbvkj and see for yourself
app.use((req, res) => {
  res.status("404").render("404", { title: "Error" });
});
