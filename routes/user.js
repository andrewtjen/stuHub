var express = require('express');
var router = express.Router();



var userController = require('../controllers/user_controller.js');

// get register Form
router.get('/register', function(req, res){
    res.render('register');
});

//register user
router.post('/register', userController.validate('saveUser'), userController.createUser);

//get update profile form
router.get('/updateProfile', userController.ensureAuthenticated , userController.loadUser);

//update Profile
router.post('/updateProfile', userController.validate('saveUser'), userController.updateProfile);

//register user
router.get('/login', function(req, res){
    res.render('login');
});

//Login process
router.get('/login', function(req, res){
    res.render('login');
});

// Login Process
router.post('/login', userController.ensureVerified);

// LogOut process
router.get('/logout', userController.logOut);

router.get('/history/joined', userController.ensureAuthenticated,userController.getAllJoinHistory);

router.get('/history/created', userController.ensureAuthenticated,userController.getAllCreateHistory);

router.get('/confirmation/:id', userController.confirmationPost);

router.get('/send/verification', userController.resendTokenGet);

router.post('/send/verification', userController.validate("emailValidate"), userController.resendTokenPost);

router.get('/send/passwordreset', userController.sendresetPasswordGet);

router.post('/send/passwordreset', userController.validate("emailValidate"), userController.sendresetPasswordPost);

router.get('/confirmedpasswordreset/:id', userController.resetPasswordGet);

router.post('/confirmedpasswordreset/:id', userController.validate("passwordValidate"), userController.resetPasswordPost);

module.exports = router;