var mongoose = require('mongoose');

//Bringing the models
let Event = require('../models/event');
const { check, validationResult } = require('express-validator');

//add event
var createEvent = function (req, res) {
    check(['name','name is required']).notEmpty(),
    check(['category','category is required']).notEmpty();
    check('location','location is required').notEmpty();
    check('date','date is required').notEmpty();
    check('time','time is required').notEmpty();
    check('description','description is required').notEmpty();

    // Get Errors
    let errors = validationResult(req);
    console.log(errors);
    errors = false;
    if(errors){
        res.render('add_event', {
        title:'Add Event',
        errors:errors
        });
    } else {

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
                req.flash('success','Event Added');
                res.redirect('/');
            }
        });
    }
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
    var id = req.params.id;

    Event.findById(id, function(err, event){
        res.render('edit_event', {
            name: 'Edit Event',
            event: event
        });
    });
};

//post edit event
var editEvent =  function (req, res) {
    var id = req.body.id;
    
    Event.findById(id, function(err, event) {

        if (err) {
            console.error('error, no event found');
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
                req.flash('success','Event Updated');
                res.redirect('/');
            }
        });
    });
};

//delete event
var deleteEvent = function (req, res) {
    var id = req.body.id;
    Event.findByIdAndRemove(id).exec();
    req.flash('danger','Event Deleted');
    res.redirect('/');
};


module.exports.createEvent = createEvent;
module.exports.getEvent = getEvent;
module.exports.loadEvent = loadEvent;
module.exports.editEvent = editEvent;
module.exports.deleteEvent = deleteEvent;