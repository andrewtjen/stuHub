var express = require('express');
var router = express.Router();


var eventController = require('../controllers/event_controller.js');
let Event = require('../models/event');


//get add event page
router.get('/add', eventController.ensureAuthenticated, eventController.getEventPage);

//add event
router.post('/add', eventController.ensureAuthenticated, eventController.validate('saveEvent'), eventController.createEvent);

//get single event
router.get('/:id', eventController.getEvent);

//load edit event
router.get('/edit/:id', eventController.ensureAuthenticated, eventController.loadEvent);

//post edit event
router.post('/edit', eventController.validate('saveEvent'), eventController.editEvent);

//delete event
router.post('/delete',  eventController.ensureAuthenticated, eventController.deleteEvent);

//join event
router.post('/join/:id', eventController.ensureAuthenticated, eventController.joinEvent);

//user_in_event
router.get('/user/:id', eventController.user_in_event);

//leave event
router.post('/leaveEvent', eventController.ensureAuthenticated, eventController.leaveEvent);

module.exports = router;
