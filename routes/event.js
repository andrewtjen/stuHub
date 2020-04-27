var express = require('express');
var router = express.Router();


var eventController = require('../controllers/event_controller.js');
let Event = require('../models/event');


//get add event page
router.get('/add', eventController.ensureAuthenticated, eventController.getEventPage);

//add event
router.post('/add', eventController.validate('saveEvent'), eventController.createEvent);

//get single event
router.get('/:id', eventController.getEvent);

//load edit event
router.get('/edit/:id', eventController.ensureAuthenticated, eventController.loadEvent);

//post edit event
router.post('/edit', eventController.validate('saveEvent'), eventController.editEvent);

//delete event
router.post('/delete', eventController.deleteEvent);

router.post('/join/:id', eventController.ensureAuthenticated, eventController.joinEvent);


module.exports = router;
