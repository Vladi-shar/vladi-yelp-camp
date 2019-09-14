const express   = require('express'),
    router    = express.Router({mergeParams: true}),
    Campground  = require('../models/campground'),
    Comment     = require('../models/comment'),
    middleware  = require('../middleware');

// New comment form
router.get('/new', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            req.flash('error', 'Sorry, something went wrong, please try that again');
        } else {
            res.render('comments/new', {campground: campground});
        }
    })
});

// Create comment
router.post('/', middleware.isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err || !campground){
            console.log(err);
            req.flash('error', 'Sorry, something went wrong, please try that again');
            res.redirect('/campgrounds');
        } else {
            //console.log(req.body.comment)
            Comment.create(req.body.comment, (err, comment) => {
                if (err || !comment) {
                    console.log(err);
                    req.flash('error', 'Sorry, something went wrong, please try that again');
                    res.redirect('/campgrounds');
                } else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    // save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save((err) => {
                        if (err) {
                            req.flash('error', 'Sorry, something went wrong, please try that again');
                            console.log(err);
                        } else {
                            req.flash('success', 'Comment added successfully');
                        }
                        res.redirect('/campgrounds/' + campground._id);
                    })
                }
            })
        }
    })
});

// EDIT
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err || !campground) {
            req.flash('error', 'Sorry, something went wrong, please try that again');
            res.redirect('back');
        } else {
            Comment.findById(req.params.comment_id, (comment_err, comment) => {
                if (comment_err || !comment) {
                    req.flash('error', 'Sorry, something went wrong, please try that again');
                    res.redirect('back');
                } else {
                    res.render('comments/edit', {campground: campground, comment: comment});
                }
            });
        }
    });
});

// UPDATE
router.patch('/:comment_id' , middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
        if (err) {
            req.flash('error', 'Sorry, something went wrong, please try that again');
            res.redirect('back');
        } else {
            req.flash('success', 'Comment edited successfully');
            res.redirect('/campgrounds/' + req.params.id);
        }
    })
});

// DESTROY

router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            req.flash('error', 'Sorry, something went wrong, please try that again');
            console.log(err);
        } else {
            req.flash('success', 'Comment deleted successfully');
        }
        res.redirect('back');
    })
});



module.exports = router;