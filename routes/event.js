var express = require('express');
var router = express.Router();


var eventController = require('../controllers/event_controller.js');
let Event = require('../models/event');



//Home Route
// router.get('/', function (req, res) {
//     Event.find({}, function(err, events){
//         if(err){
//             console.log(err);
//         } else {
//             res.render('index', {
//                 title:'List of Events',
//                 events: events
//             });
//         }
//     })
// });


//add event
router.get('/add', function (req, res) {
    res.render('add_event', {
        title:'add_event'
    });
});

router.post('/add', eventController.validate('saveEvent'), eventController.createEvent);

//get single event
router.get('/:id', eventController.getEvent);

//load edit event
router.get('/edit/:id', eventController.loadEvent);

//post edit event
router.post('/edit', eventController.validate('saveEvent'), eventController.editEvent);

//delete event
router.post('/delete', eventController.deleteEvent);

router.post('/join/:id', eventController.joinEvent);

module.exports = router;
