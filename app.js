const express	 		= require('express'),
	bodyParser			= require('body-parser'),
	mongoose			= require('mongoose'),
	flash				= require('connect-flash'),
	passport			= require('passport'),
	LocalStrategy		= require('passport-local'),
	methodOverride		= require('method-override'),
	Campground		 	= require('./models/campground'),
	seedDB				= require('./seeds'),
	Comment				= require('./models/comment'),
	User				= require('./models/user'),
	app					= express();

const commentRoutes 	= require('./routes/comments'),
	campgroundRoutes	= require('./routes/campgrounds'),
	indexRoutes 		= require('./routes/index');

const connectionString = 'mongodb+srv://VladiPc:Al0nga55fuck1ngt1m3ag0@vladisharcluster-eit8n.mongodb.net/YelpCamp?retryWrites=true&w=majority';

mongoose.connect(connectionString, {useNewUrlParser: true,  useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true}).catch((err) => {console.log(err)});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
app.set("view engine", "ejs");
// seed the database
// seedDB();


// PASSPORT CONFIG
app.use(require('express-session')({
	secret: "שלום עולם",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});


app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(3000, () => {
	console.log("Server started on 3000");
});