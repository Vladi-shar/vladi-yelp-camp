const express   = require('express'),
    router      = express.Router(),
    Campground  = require('../models/campground'),
    Comment     = require('../models/comment'),
    middleware  = require('../middleware');

// campgrounds route
router.get('/', (req, res) => {
    Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    })
});

// NEW - page to create a new campground
// needs to be before /:id, otherwise /:id will catch /new
router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

// SHOW - shows more info about one campground
router.get('/:id', (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, campground) => {
        if (err){
            console.log(err);
            req.flash('error', err.message);
            res.redirect('back');
        } else if (!campground) {
            req.flash('error', 'Campground not found');
            res.redirect('back');
        } else {
            console.log(campground);
            res.render("campgrounds/show", {campground: campground});
        }
    })
});

// CREATE - add new campground to db
router.post('/', middleware.isLoggedIn, (req, res) => {
    let newCampground = {
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        },
        price: req.body.price,
        features: [
            {
                text: req.body.feature1
            }
        ]
    };
    if (req.body.feature2) {
        newCampground.features.push({text: req.body.feature2});
    }
    if (req.body.feature3) {
        newCampground.features.push({text: req.body.feature3})
    }
    Campground.create(newCampground, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(campground);
            req.flash('success', campground.name + ' was successfully created!');
            res.redirect('/campgrounds');
        }
    })
});

// EDIT
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            req.flash('error', 'Sorry, something went wrong, please try that again');
            res.redirect('back');
        } else {
            res.render('campgrounds/edit', {campground: campground});
        }});
});

// UPDATE
router.patch('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    let newCampground = req.body.campground;
    newCampground.features = [{ text: req.body.feature1}];
    if (req.body.feature2) {
        newCampground.features.push({text: req.body.feature2});
    }
    if (req.body.feature3) {
        newCampground.features.push({text: req.body.feature3})
    }
    Campground.findByIdAndUpdate(req.params.id, newCampground, (err, campground) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Sorry, something went wrong, please try that again?');
            res.redirect('back');
        } else {
            req.flash('success', campground.name + ' was successfully edited!' );
            res.redirect('/campgrounds/' + req.params.id);
        }});
});

// DESTROY
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
    //console.log('delete ' + req.body.name);
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            req.flash('error', 'Sorry, something went wrong, please try that again');
            res.redirect('/campgrounds');
        } else {
            let name = campground.name;
            campground.remove((err) => {
                if (err) {
                    req.flash('error', 'Sorry, something went wrong, please try that again');
                    console.log(err);
                } else {
                    req.flash('success', name + ' was successfully removed!' );
                }
                res.redirect('/campgrounds');
            });
        }
    });
    // Campground.findOneAndRemove({"_id": req.params.id}, (err) => {
    //     if (err) {console.log(err) } else {
    //         res.redirect('/campgrounds');
    //     }
    // });
});



module.exports = router;