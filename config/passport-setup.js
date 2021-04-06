const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User= require('../models/user-model');

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id).then((user)=>{
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        //check if user already exists
        User.findOne({googleId: profile.id}).
        then((currentUser)=>{
            if(currentUser){
                //already have user
                //console.log(profile.emails[0].value)
                console.log("user is"+ currentUser);
                done(null, currentUser);
            }
            else{
                //create new user
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    email: profile.emails[0].value
                }).save()
                .then((newUser)=>{
                    console.log("new user created"+newUser);
                    done(null, newUser);
                })
                .catch((err)=> console.log(err));
            }
        })
        .catch((err)=>console.log(err));
    })
);
