var mongoose = require('mongoose');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

const EMAIL = "webitworkshoptue11@gmail.com"
const PASS = "Webitworkshop_tue11";

//Bringing the models
let User = require('../models/user');
let UserEvent = require('../models/user_events');
let Event = require('../models/event');
let event_controller = require("../controllers/event_controller.js");
let Token = require("../models/token");

//import model
//const UserEvent = mongoose.model(user_events);
const { body , validationResult } = require('express-validator');


var createUser = function (req, res) {

    // Get Errors
    let errors = validationResult(req);

    if(!errors.isEmpty()){
        res.render('register', {
        errors: errors.errors
        });
    } else {
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
                        var transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true,
                            auth: {
                                user: process.env.SENDGRID_USERNAME,
                                pass: process.env.SENDGRID_PASSWORD }
                        });
                        var mailOptions = {
                            from: 'no-reply@stuhub.com',
                            to: user.email,
                            subject: 'Account Verification Token',
                            text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n'
                        };
                        transporter.sendMail(mailOptions, function (err) {
                            if (err) { return res.status(500).send({ msg: err.message }); }
                            res.status(200).send('A verification email has been sent to ' + user.email + '.');
                            //res.redirect('/user/login');
                        });
                    }
                });
            }
        });
    }
};

var confirmationPost = function (req, res, next) {
    Token.findOne({ token: req.params.id }, function (err, token) {
        if (!token) {
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
                res.status(200).send("The account has been verified. Please log in.");
                res.redirect('/user/login');
            });
        });
    });
};

var resendTokenPost = function (req, res, next) {
    // req.assert('email', 'Email is not valid').isEmail();
    // req.assert('email', 'Email cannot be blank').notEmpty();
    // req.sanitize('email').normalizeEmail({ remove_dots: false });

    // Check for validation errors
    var errors = req.validationErrors();
    if (errors) return res.status(400).send(errors);

    User.findOne({ email: req.body.email }, function (err, user) {
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

        // Create a verification token, save it, and send email
        var token = new Token();
        token._userId = user._id;
        token.token = crypto.randomBytes(16).toString('hex');

        // Save the token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }

            // Send the email
            var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: process.env.SENDGRID_USERNAME, pass: process.env.SENDGRID_PASSWORD } });
            var mailOptions = { from: 'no-reply@codemoto.io', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + token.token + '.\n' };
            transporter.sendMail(mailOptions, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).send('A verification email has been sent to ' + user.email + '.');
            });
        });
    });
};


var getJoinHistory = function(req,res){
    User.findById(req.user.id, function(err, user){
        res.render('event_history_template', {
            title: 'Join History',
            events: user.joined_events
        });
    });
};

const getAllJoinHistory = function (req, res) {
    UserEvent.find({userid: req.user.id, type: "join"}, function(err, docs){
       if(err){
           res.status(400);
           req.flash("danger", "no join history");
       }
       else{
           const events = [];
           docs.forEach(element => events.push(element.eventid));

           res.render('event_history_template', {
               title: 'Join History',
               events: events
           });
       }
    });
};

const getAllCreateHistory = function (req, res) {
    UserEvent.find({userid: req.user.id, type: "create"}, function(err, docs){
        if(err){
            res.status(400);
            req.flash("danger", "no create history");
        }
        else{
            res.render('event_history_template', {
                title: 'Create History',
                events: docs
            });
        }
    });
};

var validate = (method) => {
    switch (method) {
        case 'saveUser': {

            return [ 
                body('name','name is required').notEmpty(),
                body('email','Please enter a valid UniMelb Email')
                    .isEmail()
                    .custom(value => {
                        let regex = /.unimelb.edu.au$/;
                        if (!regex.test(value)) {
                          return false;
                        }
                        return true;
                      }),
                body('email','E-mail already in use')
                    .custom(value => {
                        return User.exists({email: value}).then(user => {
                            if (user){
                                throw new Error;
                            }
                        });
                    }),
                body('password','password is required').notEmpty(),
                body('confirm_password','password do not match')
                    .exists()
                    .custom((value, { req }) => value === req.body.password)
            ]
        }
    }
}

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/user/login');
    }
}

module.exports.ensureAuthenticated = ensureAuthenticated;
module.exports.createUser = createUser;
module.exports.getJoinHistory = getJoinHistory;
module.exports.validate = validate;
module.exports.getAllJoinHistory = getAllJoinHistory;
module.exports.getAllCreateHistory = getAllCreateHistory;
module.exports.confirmationPost = confirmationPost;
module.exports.resendTokenPost = resendTokenPost;