const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { check } = require('express-validator')
const flash = require('connect-flash');
const session = require('express-session');


require('./models/db');
var routes = require('./routes/event');

//Init App
const app = express();

//Body Perser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Express session middleware
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))

// Express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Load view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use('/', routes);

app.listen(process.env.PORT || 3000, () => {
    console.log("Running on port 3000");
});
// app.listen(3000, function(){
//     console.log('server run on port 3000..');
// });

module.exports = app;