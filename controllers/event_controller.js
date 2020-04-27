var mongoose = require('mongoose');

//Bringing the models
let Event = require('../models/event');
let User = require('../models/event');
const { body , validationResult } = require('express-validator');

//add event page
var getEventPage = function (req, res) {
    res.render('add_event', {
        title:'add_event'
    });
}


//add event
var createEvent = function (req, res) {

    // Get Errors
    let errors = validationResult(req);
    

    if(!errors.isEmpty()){
        res.render('add_event', {
        title:'Add Event',
        errors: errors.errors
        });
    } else {
        let event = new Event();
        event.name = req.body.name;
        event.category = req.body.category;
        event.location = req.body.location;
        event.date = req.body.date;
        event.time = req.body.time;
        event.description = req.body.description;
        event.creatorID = req.user.id;
        event.capacity = req.body.capacity;
        event.attendants = [];
        event.current_attendees = 0;
        event.save(function(err){
            if(err){
                console.log(err);
                return;
            } else {
                req.flash('success','Event Added');
                res.redirect('/');
            }
        });
        req.user.created_events.push(event._id);
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
var joinEvent = function(req,res){
    Event.findById(req.params.id, function(err, event) {
        if (err) {
            console.error('error, no event found');
        }
        if(event.capacity >= event.current_attendees + 1) {
            if(event.creatorID == req.user.id){
                req.flash('danger', 'Owner Can\'t join own event');
                res.redirect('/');
            }
            else if(event.attendants.includes(req.user.id)){
                req.flash('danger', 'Already in Event');
                res.redirect('/');
            }
            else {
                event.attendants.push(req.user.id);
                event.current_attendees = event.current_attendees + 1;
                event.save(function (err) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        req.flash('success', 'Join Succesful');
                        res.redirect('/');
                    }
                });
                req.user.joined_events.push(req.params.id);
            }
        } else {
            //pe ini mau di isi error message "event is full" gw ga ngerti
            req.flash('danger','Event is Full');
            res.redirect('/');
        }
    });
};

//load edit event
var loadEvent =  function (req, res) {
    var id = req.params.id;

    Event.findById(id, function(err, event){

        if(event.creatorID != req.user.id){
            req.flash('danger', 'Not Authorized');
            return res.redirect('/');
        }

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


var validate = (method) => {
    switch (method) {
        case 'saveEvent': {

            return [ 
                body('name','name is required').notEmpty(),
                body('category','category is required').notEmpty(),
                body('location','location is required').notEmpty(),
                body('date','date is required').notEmpty(),
                body('time','time is required').notEmpty(),
                body('description','description is required').notEmpty(),
                body('capacity','capacity is required').notEmpty(),
                body('capacity','capacity must be a number').isNumeric()
            ]
        }
    }
}

// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      req.flash('danger', 'Please login');
      res.redirect('/user/login');
    }
}


module.exports.getEventPage = getEventPage;
module.exports.createEvent = createEvent;
module.exports.getEvent = getEvent;
module.exports.loadEvent = loadEvent;
module.exports.editEvent = editEvent;
module.exports.deleteEvent = deleteEvent;
module.exports.validate = validate;
module.exports.joinEvent = joinEvent;
module.exports.ensureAuthenticated = ensureAuthenticated;