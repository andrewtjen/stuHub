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
router.post('/updateProfile', userController.validate('editUser'), userController.updateProfile);

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

//get history joined
router.get('/history/joined', userController.ensureAuthenticated,userController.getAllJoinHistory);
router.get('/history/created', userController.ensureAuthenticated,userController.getAllCreateHistory);

//get confirmation
router.get('/confirmation/:id', userController.confirmationPost);

//get send verification
router.get('/send/verification', userController.resendTokenGet);
router.post('/send/verification', userController.validate("emailValidate"), userController.resendTokenPost);

//Password reset
router.get('/send/passwordreset', userController.sendresetPasswordGet);
router.post('/send/passwordreset', userController.validate("emailValidate"), userController.sendresetPasswordPost);

//confirm password reset
router.get('/confirmedpasswordreset/:id', userController.resetPasswordGet);
router.post('/confirmedpasswordreset/:id', userController.validate("passwordValidate"), userController.resetPasswordPost);

module.exports = router;