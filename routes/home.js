var express = require('express');
var router = express.Router();

var homeController = require('../controllers/home_controller.js');;

//Home page that gets all event
router.get('/', homeController.getAllEvent);

// //Home page that gets all event
// router.get('/getAllEvents', homeController.getAllEvents);

//Search Route
router.get('/search',homeController.searchEventGet);


module.exports = router;