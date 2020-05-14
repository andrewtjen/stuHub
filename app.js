const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { check } = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const nodemailer = require('nodemailer');

require('./config/db');



//Init App
const app = express();

//Body Perser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Will handle text/plain requests
app.use(bodyParser.text());
// Static files like css
app.use(express.static(path.join(__dirname, "public")));


// Express session middleware
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

// Express messages middleware
app.use(require('connect-flash')());
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  res.locals.errors = req.flash("error");
  next();
});

//Load view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Passport config
require('./config/passport.js');

// Passport init
app.use(passport.initialize());
app.use(passport.session());

var events = require('./routes/event');
var users = require('./routes/user');
var home = require('./routes/home');

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

//route files
app.use('/',home);
app.use('/event', events);
app.use('/user', users);


app.listen(process.env.PORT || 3000, () => {
  console.log("Running on port 3000");
});

// app.listen(3000, function(){
//     console.log('server run on port 3000..');
// });

module.exports = app;