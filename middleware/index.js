const express   = require('express'),
    Campground  = require('../models/campground'),
    Comment     = require('../models/comment');

let middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
    if (req.isAuthenticated()){
        // does he own the campground?
        Campground.findById(req.params.id, (err, campground) => {
            if (err || !campground) {
                req.flash('error', "Campground doesn't exist");
                res.redirect('back');
            } else {
                if (campground.author.id.equals(req.user._id)){
                    next();
                } else {
                    req.flash('error', "That Campground does not belong to you!");
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash('error', 'Please log in first!');
        res.redirect('back');
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, comment) => {
            if (err || !comment) {
                // comment doesnt exist
                req.flash('error', "Comment doesn't exist");
                res.redirect('back');
            } else {
                if (comment.author.id.equals(req.user._id)){
                    next();
                } else {
                    // user doesnt own comment
                    req.flash('error', "That Comment does not belong to you!");
                    res.redirect('back');
                }
            }
        });
    } else {
        //is not logged in
        req.flash('error', 'Please log in first!');
        res.redirect('back');
    }
};

middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error', 'Please log in first!');
        res.redirect('/login');
    }
};


module.exports = middlewareObj;