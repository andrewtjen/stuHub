const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

require('./models/db');
var routes = require('./routes/event');

//Init App
const app = express();

//Body Perser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


 
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