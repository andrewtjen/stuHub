var mongoose = require('mongoose');

//Bringing the models
let Event = require('../models/event');
let UserEvents = require('../models/user_events');
let User = require('../models/user');

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
        //storing each data to the variable
        let event = new Event();
        event.name = req.body.name;
        event.category = req.body.category;
        event.location = req.body.location;
        event.datetime = new Date(req.body.date + " "+ req.body.time + ":00");
        event.description = req.body.description;
        event.creatorID = req.user.id;
        event.capacity = req.body.capacity;
        event.current_attendees = 0;
        event.save(function(err){
            if(err){
                console.log(err);
                return;
            } else {
                req.flash('success','Event Added');
                //res.redirect('/');
            }
        });
        //storing the a db created for event and user
        let userevents = new UserEvents();
        userevents.userid = req.user.id;
        userevents.eventid = event.id;
        userevents.type = "create";
        userevents.save(function(err){
            if(err){
                console.log(err);
                return;
            } else {
                res.redirect('/');
            }
        });
    }
};

//get single event in a page
var getEvent = function(req, res){

    Event.findById(req.params.id, function(err, event){

        res.render('event', {
            event: event
        });
    });
};

//join an event letting the user data created to be stored and update the capcity
var joinEvent = function(req,res){
    Event.findById(req.params.id, function(err, event) {
        if (err) {
            console.error('error, no event found');
        }
        if(event.capacity >= event.current_attendees + 1) {
            if (event.creatorID == req.user.id) {
                req.flash('danger', 'Owner Can\'t join own event');
                res.redirect('/');
                return;
            }
            else {
                UserEvents.find({userid: req.user.id, eventid: event.id, type: "join"}, function (err, docs) {
                    //check if user has previously register for the event
                    if (docs.length > 0){
                        req.flash("danger", "already in event");
                        res.redirect('/');
                    }
                    else{
                        //update the current event after joining
                        event.current_attendees = event.current_attendees + 1;
                        event.save(function (err) {
                            if (err) {
                                console.log(err);
                                return;
                            } else {
                                req.flash('success', 'Join Succesful');
                            }
                        });

                        //update to the db of the event
                        let userevents = new UserEvents();
                        userevents.userid = req.user.id;
                        userevents.eventid = event.id;
                        userevents.type = "join";
                        userevents.save(function(err){
                            if(err){
                                console.log(err);
                                return;
                            }
                        })
                        res.redirect("/");
                    }
                });
            }
        }
         else {
            //check if event is full
            req.flash('danger','Event is Full');
            res.redirect('/');
            return;
        }
    });
};

// //leave event
// var leaveEvent = function (req, res) {
//     var id = req.body.id;
//     UserEvents.findById(id, function (err, event) {
//         if(){
//             UserEvents.findByIdAndRemove(id).exec();
//             req.flash('danger','You had leave an event');
//             res.redirect('/');
//         }else{
//             req.flash('danger','Not Authorized');
//             res.redirect('/event/'+id);
//         }
//     });
// };

//load edit event
var loadEvent =  function (req, res) {
    var id = req.params.id;

    //find the data of current event
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

//Update and save the event to the db
var editEvent =  function (req, res) {
    var id = req.body.id;
    
    Event.findById(id, function(err, event) {
        
        if (err) {
            console.error('error, no event found');
        }
        event.name = req.body.name;
        event.category = req.body.category;
        event.location = req.body.location;
        event.datetime = new Date(req.body.date + " "+ req.body.time + ":00" );
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

//Who had join the event
var user_in_event =  function (req, res) {
    var id = req.params.id;
    
    //find the data of current event
    UserEvents.find({eventid:id}, function(err, user){
        if(err){
            console.log(err);
        } else {
            const userid_joined = [];
            user.forEach(element => userid_joined.push(element.userid));
            
            User.find({_id:userid_joined}, function (err, userJoined){
                if(err){
                    console.log(err);
                } else {
                    res.render('history_template', {
                        title: 'Who had join the event?',
                        events: userJoined
                    });
                }
            });
        }
    });
};

//delete event
var deleteEvent = function (req, res) {
    var id = req.body.id;
    Event.findById(id, function (err, event) {
        if(req.user.id == event.creatorID){
            Event.findByIdAndRemove(id).exec();
            req.flash('danger','Event Deleted');
            res.redirect('/');
        }else{
            req.flash('danger','Not Authorized');
            res.redirect('/event/'+id);
        }
    });
};

//validation use in the html entry
var validate = (method) => {
    switch (method) {
        case 'saveEvent': {

            return [ 
                body('name','name is required').notEmpty(),
                body('category','category is required').notEmpty(),
                body('category','must be either "sports", "studies", "leisure", "club activity"').isIn(["sports", "studies", "leisure", "club activity"]),
                body('location','location is required').notEmpty(),
                body('date','date is required').notEmpty(),
                //body('date','date cannot travel to past').custom(value => {return value >= Date.now }),
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

module.exports.user_in_event = user_in_event;
module.exports.getEventPage = getEventPage;
module.exports.createEvent = createEvent;
module.exports.getEvent = getEvent;
module.exports.loadEvent = loadEvent;
module.exports.editEvent = editEvent;
module.exports.deleteEvent = deleteEvent;
module.exports.validate = validate;
module.exports.joinEvent = joinEvent;
module.exports.ensureAuthenticated = ensureAuthenticated;