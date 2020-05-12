var express = require('express');
var router = express.Router();

var homeController = require('../controllers/home_controller.js');;

//Home page that gets all event
router.get('/', homeController.getAllEvent);


//Search Route
router.get('/search',homeController.searchEventGet);


module.exports = router;