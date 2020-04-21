var express = require('express');
var router = express.Router();


var eventController = require('../controllers/event_controller.js');
let Event = require('../models/event');

//Home Route
router.get('/', function (req, res) {
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
router.get('/event/add', function (req, res) {
    res.render('add_event', {
        title:'add_event'
    });
});

router.post('/event/add', eventController.createEvent);

//get single event
router.get('/event/:id', eventController.getEvent);

//load edit event
router.get('/event/edit/:id', eventController.loadEvent);

//post edit event
router.post('/event/edit', eventController.editEvent);

//delete event
router.post('/event/delete', eventController.deleteEvent);

module.exports = router;
