var mongoose = require('mongoose');

//Bringing the models
let User = require('../models/user');
// let UserEvent = require('../models/user_events');

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
                console.log(err);
                return;
            } else {
                req.flash('success','user Added');
                res.redirect('/user/login');
            }
        });
    }
};

var getJoinHistory = function(req,res){
    User.findById(req.user.id, function(err, user){
        res.render('event_history_template', {
            title: 'Join History',
            events: user.joined_events
        });
    });
};
// const getAllJoinHistory = async (req, res) => {
//     try {
//         const all_join_history = await UserEvent.find({userid: req.userid, type: "join"});
//         return res.render('event_history_template', {
//             title: "Join History",
//             events: all_join_history
//         });
//     } catch (err) {
//         res.status(400)
//         req.flash('danger','No join history found');
//         //res.redirect('/');
//     }
// };

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


module.exports.createUser = createUser;
module.exports.getJoinHistory = getJoinHistory;
module.exports.validate = validate;
// module.exports.getAllJoinHistory = getAllJoinHistory;