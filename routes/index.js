const express   = require('express'),
    router      = express.Router(),
    passport    = require('passport'),
    User        = require('../models/user');


// root route
router.get('/', (req, res) => {
    //res.redirect("/campgrounds");
    res.render('landing');
});

// register form route
router.get('/register', (req, res) => {
    res.render('register');
});

// register route
router.post('/register', (req, res) => {
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            req.flash('error', err.message);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, () => {
                req.flash('success', 'Welcome to YelpCamp, ' + newUser.username);
                res.redirect('/campgrounds');
            })
        }
    })
});


// login form route
router.get('/login', (req, res) => {
    res.render('login');
});

// login route
router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/campgrounds',
        successFlash: 'Welcome back',
        failureRedirect: '/login',
        failureFlash: true
    }) ,(req, res) => {
    console.log("unreachable code :D");
});

// router.get('/campgroundsSuccess/:username', (req, res) => {
//     req.flash('success', "Welcome back, " + req.params.username);
//     res.redirect('/campgrounds');
// });
//
// router.get('/loginFail', (req, res) => {
//    req.flash('error', "Login failed");
//    res.redirect('/login');
// });

// logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/campgrounds');
});

module.exports = router;