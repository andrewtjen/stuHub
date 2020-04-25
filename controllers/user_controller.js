var mongoose = require('mongoose');

//Bringing the models
let User = require('../models/user');
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
        user.joined_events = [];
        user.created_events = [];

        user.save(function(err){
            if(err){
                console.log(err);
                return;
            } else {
                req.flash('success','user Added');
                res.redirect('/user/login');
            }
        });
    }
};

var validate = (method) => {
    switch (method) {
        case 'saveUser': {

            return [ 
                body('name','name is required').notEmpty(),
                body('email','email is required').notEmpty(),
                body('password','password is required').notEmpty(),
                body('confirm_password','password do not match')
                    .exists()
                    .custom((value, { req }) => value === req.body.password)
            ]
        }
    }
}


module.exports.createUser = createUser;
module.exports.validate = validate;