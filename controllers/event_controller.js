var mongoose = require('mongoose');

//Bringing the models
let Event = require('../models/event');
let User = require('../models/event');
const { body , validationResult } = require('express-validator');

//add event
var createEvent = function (req, res) {

    // Get Errors
    let errors = validationResult(req);
    

    if(!errors.isEmpty()){
        console.log(errors);
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


var validate = (method) => {
    switch (method) {
        case 'saveEvent': {

            return [ 
                body('name','name is required').notEmpty(),
                body('category','category is required').notEmpty(),
                body('location','location is required').notEmpty(),
                body('date','date is required').notEmpty(),
                body('time','time is required').notEmpty(),
                body('description','description is required').notEmpty()
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
      res.redirect('/users/login');
    }
}

  
module.exports.createEvent = createEvent;
module.exports.getEvent = getEvent;
module.exports.loadEvent = loadEvent;
module.exports.editEvent = editEvent;
module.exports.deleteEvent = deleteEvent;
module.exports.validate = validate;