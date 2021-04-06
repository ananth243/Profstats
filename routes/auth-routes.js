const router = require('express').Router();
const passport = require('passport');

// auth with google+
router.get('/google', passport.authenticate('google'/*passport takes over the authentication process*/, {
    scope: ['profile', 'email']//Gives us access to profile and email of user
}));

// callback route (upon signing in and verification) for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    req.logout();//Logs user out of the session
    res.redirect('/');
});

module.exports = router;
