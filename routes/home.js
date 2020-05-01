var express = require('express');
var router = express.Router();

var eventController = require('../controllers/event_controller.js');
let Event = require('../models/event');

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

module.exports = router;