var express = require('express');
var router = express.Router();


var userController = require('../controllers/user_controller.js');

// Register Form
router.get('/register', function(req, res){
    res.render('register');
});

//register user
router.post('/register', userController.validate('saveUser'), userController.createUser);


//register user
router.get('/login', function(req, res){
    res.render('login');
});

module.exports = router;