var express = require('express');
var router = express.Router();
var passport = require('passport');


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

//Login process
router.get('/login', function(req, res){
    res.render('login');
});

// Login Process
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
      successRedirect:'/',
      failureRedirect:'/user/login',
      failureFlash: true
    })(req, res, next);
});

// LogOut process
router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/user/login');
});

router.get('/history/joined', userController.ensureAuthenticated,userController.getAllJoinHistory);

router.get('/history/created', userController.ensureAuthenticated,userController.getAllCreateHistory);

router.post('/confirmation/:id', userController.confirmationPost);

router.post('/resend', userController.resendTokenPost);

//
// router.get('/joinhistory')
module.exports = router;