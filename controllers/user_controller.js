var mongoose = require('mongoose');
var passport = require('passport');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');


const EMAIL = "studenthubpersonal@gmail.com";


const SENDGRID_API_KEY = "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";
const SENDGRID_USERNAME = "studenthub";
const SENDGRID_PASS = "Webitworkshop_tue11";

//Bringing the models
let User = require('../models/user');
let UserEvent = require('../models/user_events');
let Event = require('../models/event');
let event_controller = require("../controllers/event_controller.js");
let Token = require("../models/token");

//import model
//const UserEvent = mongoose.model(user_events);
const { body , validationResult } = require('express-validator');


//creating a user
var createUser = function (req, res) {

    // Get Errors
    let errors = validationResult(req);
    let nameError = errors.array({onlyFirstError: false}).find(itm => itm.param === 'name');
    let emailError = errors.array({onlyFirstError: false}).find(itm => itm.param === 'email');
    let passwordError = errors.array({onlyFirstError: false}).find(itm => itm.param === 'password');
    let confirmPasswordError = errors.array({onlyFirstError: false}).find(itm => itm.param === 'confirm_password');

    if(!errors.isEmpty()){
        res.render('register', {
            nameError: nameError,
            emailError: emailError,
            passwordError: passwordError,
            confirmPasswordError: confirmPasswordError
        });
    } else {
        //storing data from the fields enter
        let user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.verified = false;
        user.save(function(err){
            if(err){
                res.status(500).send({msg: err.message});
                //console.log(err);
                return;
            } else {
                var token = new Token();
                token._userId = user._id;
                token.token = crypto.randomBytes(16).toString('hex');
                token.save(function(err){
                    if(err) {
                        res.status(500).send({msg: err.message});
                        //console.log(err);
                        return;
                    }
                    else{
                        //sending an email verification after saving the data
                        var options = {
                            auth: {
                                api_user: SENDGRID_USERNAME,
                                api_key: SENDGRID_PASS
                            }
                        };
                        var transporter = nodemailer.createTransport(sgTransport(options));

                        var mailOptions = {
                            from: EMAIL,
                            to: user.email,
                            subject: 'Account Verification',
                            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user/confirmation\/' + token.token
                        };
                        //ask to check email
                        transporter.sendMail(mailOptions, function (err) {
                            if (err) { return res.status(500).send({ msg: err.message }); }
                            //res.status(200).send('A verification email has been sent to ' + user.email + '.');
                            res.render('AfterSignUp', {
                                email: user.email
                            });
                            // req.flash("success","Email verification sent");
                            // res.redirect('/user/login');
                        });
                    }
                });
            }
        });
    }
};

//right now its fine , but later separate find token to confirmationGet and the rest to confirmation Post
var confirmationPost = function (req, res, next) {
    Token.findOne({ token: req.params.id }, function (err, token) {
        if (!token) {
            //token expire, render send new verification email html
            res.status(400).send({
                type: 'not-verified',
                msg: 'We were unable to find a valid token. Your token my have expired.'
            });
        }
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId}, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
            if (user.verified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

            // Verify and save the user

            user.verified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                //account veriried, render again to login page
                //res.status(200).send("The account has been verified. Please log in.");
                req.flash("success", "account has been verified. Please log in");
                res.redirect('/user/login');
            });
        });
    });
};


var resendTokenGet = function(req,res){
    res.render('require_email_page',{
        title: "Resend Email Verification",
        action: "verification"
    });
}


var resendTokenPost = function (req, res, next) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.verified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

        // Create a verification token, save it, and send email
        var token = new Token();
        token._userId = user._id;
        token.token = crypto.randomBytes(16).toString('hex');

        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }

            // Send the email
            var options ={
                auth: {
                    api_user: SENDGRID_USERNAME,
                    api_key: SENDGRID_PASS
                }
            };
            var transporter = nodemailer.createTransport(sgTransport(options));
            var mailOptions = {
                from: EMAIL,
                to: user.email,
                subject: 'Account Verification',
                text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user/confirmation\/' + token.token
            };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                //res.status(200).send('A verification email has been sent to ' + user.email + '.');
                // req.flash("success","Email verification sent");
                // res.redirect('/user/login');
                res.render('AfterSignUp', {
                    email: user.email
                });
            });
        });
    });
};


var sendresetPasswordGet = function(req,res){
    res.render('require_email_page',{
        title: "Reset Password",
        action: "passwordreset"
    });
};
//reset password require email in body
var sendresetPasswordPost = function(req,res, next){
    User.findOne({email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({msg: 'We were unable to find a user with that email.'});

        // Create a verification token, save it, and send email
        var token = new Token();
        token._userId = user._id;
        token.token = crypto.randomBytes(16).toString('hex');

        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }

            user.passwordResetToken = token.token;
            user.passwordResetExpire = token.createdAt;

            // Send the email
            var options ={
                auth: {
                    api_user: SENDGRID_USERNAME,
                    api_key: SENDGRID_PASS
                }
            };
            var transporter = nodemailer.createTransport(sgTransport(options));
            var mailOptions = {
                from: EMAIL,
                to: user.email,
                subject: 'Password Reset',
                text: 'Hello,\n\n' + 'Press this link to reset your password: \nhttp:\/\/' + req.headers.host + '\/user/confirmedpasswordreset\/' + token.token
            };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                user.save(function (err) {
                    if (err) {
                        return res.status(500).send({msg: err.message});
                    }
                    res.status(200).send('A password reset link has been sent to ' + user.email + ' .');
                });


            });
        });
    });
}


var resetPasswordGet = function(req,res){
    Token.findOne({ token: req.params.id }, function (err, token) {
        if (!token) {
            //token expire, render send new verification email html
            res.status(400).send({
                type: 'not-verified',
                msg: 'We were unable to find a valid token. Your token my have expired.'
            });
        }
        res.render('password_reset_page', {
            token_id: req.params.id
        });
    });
}
// post reset password
var resetPasswordPost = function(req,res){
    User.findOne({passwordResetToken : req.params.id}, function(err,user){
        user.password = req.body.password;
        user.PasswordResetToken = null;
        user.PasswordResetExpire = null;

        user.save(function (err) {
            if (err) {return res.status(500).send({msg: err.message});}
            Token.deleteOne({token: req.params.id}, function(err,token){
                if (err) {return res.status(500).send({msg: err.message});}
            });
            req.flash("success", "Password resetted");
            res.redirect('/user/login');
        });
    });
}

var getJoinHistory = function(req,res){
    User.findById(req.user.id, function(err, user){
        res.render('history_template', {
            title: 'Join History',
            events: user.joined_events
        });
    });
};

const getAllJoinHistory = function (req, res) {
    UserEvent.find({userid :req.user.id}, function (err, docs) {
        if(err){
            res.status(400);
            req.flash("danger", "no join history");
        }
        else{
            const eventsID = [];
            docs.forEach(element => eventsID.push(element.eventid));
            Event.find({_id:eventsID}, function (err, eventJoined){
                if(err){
                    console.log(err);
                }
                else{
                    res.render('history_template', {
                    title: 'Join History',
                    events: eventJoined
                    });
                }
            });
        }
    });
};

const getAllCreateHistory = function (req, res) {

    let eventCreated = req.user.eventCreated;

    Event.find({_id:eventCreated}, function(err, all_events){
        if(err){
            console.log(err);
        } else {
            res.render('history_template', {
                title: 'Create History',
                events: all_events
            });
        }
    });

    

};

var validate = (method) => {
    switch (method) {
        case 'editUser': {
            return [
                body('name','Name is Required').notEmpty(),
                body('password','Password is Required and Needs to be at least 8 Characters').notEmpty()
                    .isLength({min:8}),
                body('confirm_password','Password Do Not Match')
                    .notEmpty()
                    .custom((value, { req }) => value === req.body.password)
            ]
        }
        case 'saveUser': {
            return [
                body('name','Name is Required').notEmpty(),
                body('email','Please Enter a Valid UniMelb Email')
                    .isEmail()
                    .custom(value => {
                        let regex = /.unimelb.edu.au$/;
                        if (!regex.test(value)) {
                          return false;
                        }
                        return true;
                      })
                ,
                body('email','E-mail Already in Use')
                    .custom(value => {
                        return User.exists({email: value}).then(user => {
                            if (user){
                                throw new Error;
                            }
                        });
                    }),
                body('password','Password is Required and Needs to be at least 8 Characters').notEmpty()
                    .isLength({min:8}),
                body('confirm_password','Password Do Not Match')
                    .exists()
                    .custom((value, { req }) => value === req.body.password)
            ]
        }
        case 'emailValidate': {

            return [
                body('email','Please enter a valid UniMelb Email')
                    .isEmail()
                    .custom(value => {
                        let regex = /.unimelb.edu.au$/;
                        if (!regex.test(value)) {
                        return false;
                        }
                        return true;
                    })

                ,
                body('email','E-mail already in use')
                    .custom(value => {
                        return User.exists({email: value}).then(user => {
                            if (user){
                                throw new Error;
                            }
                        });
                    })
            ]
        }
        case 'passwordValidate': {
            return [
                body('password','password is required and needs to be atleast 8 characters').notEmpty()
                    .isLength({min:8}),
                body('confirm_password','password do not match')
                    .exists()
                    .custom((value, { req }) => value === req.body.password)
            ]
        }
    }
}

//validating user has been verified
var ensureVerified = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }

        if (!user) {
            req.flash('danger', 'Incorrect Username or Password. Please try again!');
            return res.render('login', {danger: req.flash('danger')});
        }

        if (!user.verified) {
            req.flash('danger', 'Account is not yet verified! Please check your email.');
            return res.render('login', {danger: req.flash('danger')});
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    })(req, res, next);
}

//logOut

var logOut = function(req, res){
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/');
}

//getUpdateUser
var loadUser =  function (req, res) {
    var id = req.user.id;

    //find the data of current event
    User.findById(id, function(err, user){

        res.render('updateProfile', {
            name: 'Update Profile',
            user: user
        });
    });
};

//updateUserProfile
var updateProfile =  function (req, res) {
    var id = req.user.id;
    let errors = validationResult(req);
    let nameError = errors.array({onlyFirstError: false}).find(itm => itm.param === 'name');
    let passwordError = errors.array({onlyFirstError: false}).find(itm => itm.param === 'password');
    let confirmPasswordError = errors.array({onlyFirstError: false}).find(itm => itm.param === 'confirm_password');

    if(!errors.isEmpty()) {
        User.findById(id, function(err, user) {
            res.render('updateProfile', {
                nameError: nameError,
                passwordError: passwordError,
                confirmPasswordError: confirmPasswordError,
                user: user
            });
        });
    }
    else {
        User.findById(id, function (err, user) {

            if (err) {
                console.error('error, invalid User');
            }
            user.name = req.body.name;
            user.password = req.body.password;
            user.save(function (err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    req.flash('success', 'Profile Updated!');
                    res.redirect('/');
                }
            });
        });
    }
};

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/user/login');
    }
}

module.exports.updateProfile = updateProfile;
module.exports.loadUser = loadUser;
module.exports.logOut = logOut;
module.exports.ensureVerified = ensureVerified;
module.exports.ensureAuthenticated = ensureAuthenticated;
module.exports.createUser = createUser;
module.exports.getJoinHistory = getJoinHistory;
module.exports.validate = validate;
module.exports.getAllJoinHistory = getAllJoinHistory;
module.exports.getAllCreateHistory = getAllCreateHistory;
module.exports.confirmationPost = confirmationPost;
module.exports.resendTokenGet = resendTokenGet;
module.exports.resendTokenPost = resendTokenPost;
module.exports.sendresetPasswordGet = sendresetPasswordGet;
module.exports.sendresetPasswordPost = sendresetPasswordPost;
module.exports.resetPasswordGet = resetPasswordGet;
module.exports.resetPasswordPost = resetPasswordPost;
