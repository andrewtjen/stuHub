const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

require('./models/db');

//Init App
const app = express();

//Body Perser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//Bringing the models
let Event = require('./models/event');
 
//Load view Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Home Route
app.get('/', function (req, res) {
    Event.find({}, function(err, events){
        if(err){
            console.log(err);
        } else {
            res.render('index', {
                title:'List of Events',
                events: events
            });
        }
    })
});


//add event
app.get('/event/add', function (req, res) {
    res.render('add_event', {
        title:'add_event'
    });
});

app.post('/event/add', function (req, res) {
    let event = new Event();
    event.name = req.body.name;
    event.category = req.body.category;
    event.location = req.body.location;
    event.date = req.body.date;
    event.time = req.body.time;
    event.description = req.body.description;

    event.save(function(err){
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }
    });
});

//get single event
app.get('/event/:id', function(req, res){
    Event.findById(req.params.id, function(err, event){
        res.render('event', {
            event: event
        });
    });

});

//load edit event
app.get('/event/edit/:id', function (req, res) {
    Event.findById(req.params.id, function(err, event){
        res.render('edit_event', {
            title: 'Edit Event',
            event: event
        });
    });
});

//post edit event
app.post('/event/edit/:id', function (req, res) {
    var id = req.params.id;
    
    Event.findById(id, function(err, event) {

        if (err) {
            console.error('error, no cafe found');
        }
        event.name = req.body.name;
        event.category = req.body.category;
        event.location = req.body.location;
        event.date = req.body.date;
        event.time = req.body.time;
        event.description = req.body.description;
        event.save();
    });
    res.redirect('/');
});

//delete event
app.post('/event/delete/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    Event.findByIdAndRemove(id).exec();
    res.redirect('/');
});

// app.listen(3000, function(){
//     console.log('server run on port 3000..');
// });

module.exports = app;