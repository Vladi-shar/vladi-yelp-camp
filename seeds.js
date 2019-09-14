const mongoose 		= require('mongoose'),
	  Campground	= require('./models/campground'),
	  Comment		= require('./models/comment');

let data = [
	{
		name: "Cloud's Rest",
		image: "https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name: "Desert Mesa",
		image: "https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name: "Mountain Viee",
		image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	},
	{
		name: "Lakeside Fields",
		image: "https://images.unsplash.com/photo-1508873696983-2dfd5898f08b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	}
]

function seedDB(){
	// remove all campgrounds
	Campground.deleteMany({}, (err) => {
		 if (err) {
		 	console.log(err)
		 } // else {
		// 	console.log('removed campgrounds!');
		// 	Comment.deleteMany({}, (err) => {
		// 		if (err) {
		// 			console.log(err)
		// 		} else {
		// 			console.log('removed comments!');
		// 			// add a few campgrounds
		// 			data.forEach((seed) => {
		// 				Campground.create(seed, (err, campground) => {
		// 					if (err) {
		// 						console.log(err);
		// 					} else {
		// 						console.log('added a campground');
		// 						// add comments
		// 						Comment.create(
		// 							{text: "Cool, but no wifi :(", author: 'Homer'},
		// 							(err, comment) => {
		// 								if (err) {
		// 									console.log(err)
		// 								} else {
		// 									campground.comments.push(comment);
		// 									campground.save((err) => {
		// 										if (err) {
		// 											console.log(err);
		// 										} else {
		// 											console.log('created new comment');
		// 										}
		// 									});
		// 								}
		// 							});
		// 					}
		// 				});
		// 			});
		// 		}
		// 	});
		// }
	});
	
	

	
}

module.exports = seedDB;