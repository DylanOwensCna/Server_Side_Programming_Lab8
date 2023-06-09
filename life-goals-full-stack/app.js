var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
const User = require('./models/users');
const Goal = require('./models/goals');

// use this file to define all the routes of the application
var indexRouter = require('./routes/index');

var app = express();
app.set("views", __dirname);
app.set("view engine", "pug");

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
passport.use(
  new LocalStrategy(async(username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      });


    } catch(err) {
      return done(err);
    };
  })
);


// Define a new route handler for the user's goals
app.get('/goals', isAuthenticated, async (req, res) => {
  try {
    // Find all the goals with the same userID as the user's id
    const goals = await Goal.find({ user_id: req.session.user.id });


    // Pass the goals to the view
    return res.render('goals', { goals: goals });
  } catch(err) {
    return res.render('error', { message: err.message });
  }
});
app.get("/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return next();
    }
    const goals = await Goal.find();
    res.render("goals", {
      title: `${user.username}'s Goals`,
      user,
      goals,
    });
  } catch (err) {
    return next(err);
  }
});

// Define a middleware function to check if the user is authenticated
function isAuthenticated(req, res, next) {
  console.log('isAuthenticated middleware called');
  console.log('req.isAuthenticated():', req.isAuthenticated());
  console.log('req.user:', req.user);
  if (req.isAuthenticated()) {
    // Store the authenticated user in the session
    req.session.user = req.user;
    return next();
  } else {
    // User is not authenticated, redirect to login page
    return res.redirect('/login');
  }
}
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// dotenv config
dotenv.config();

// Set up mongoose connection
mongoose.set('strictQuery', false);
const mongoDB = `${process.env.MONGO_URI}`;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/create', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
