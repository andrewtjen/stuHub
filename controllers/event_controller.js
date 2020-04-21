var mongoose = require('mongoose');

//Bringing the models
let Event = require('../models/event');


//add event
var createEvent = function (req, res) {
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
};

//get single event
var getEvent = function(req, res){
    Event.findById(req.params.id, function(err, event){
        res.render('event', {
            event: event
        });
    });

};

//load edit event
var loadEvent =  function (req, res) {
    Event.findById(req.params.id, function(err, event){
        res.render('edit_event', {
            title: 'Edit Event',
            event: event
        });
    });
};

//post edit event
var editEvent =  function (req, res) {
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
        event.save(function(err){
            if(err){
                console.log(err);
                return;
            } else {
                res.redirect('/');
            }
        });
    });
};

//delete event
var deleteEvent = function (req, res) {
    var id = req.body.id;
    Event.findByIdAndRemove(id).exec();
    res.redirect('/');
};



module.exports.createEvent = createEvent;
module.exports.getEvent = getEvent;
module.exports.loadEvent = loadEvent;
module.exports.editEvent = editEvent;
module.exports.deleteEvent = deleteEvent;