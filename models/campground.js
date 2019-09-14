const mongoose	= require('mongoose'),
	  Comment	= require('./comment');

let CampgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	price: String,
	features: [
		{
			text: String
		}
	]
});

CampgroundSchema.pre('doAThing', async function() {
	console.log("doing a thing??");
});

CampgroundSchema.pre( 'remove', async function(next) {
	console.log(this);
	try {
		await Comment.remove({
			"_id": {
				$in: this.comments
			}
		});
		console.log('continueing..');
		next();
	} catch(err) {
		console.log('error...');
		next(err);
	}
});



module.exports = mongoose.model("Campground", CampgroundSchema);