var mongoose = require('mongoose');
let Event = require('../models/event');
let UserEvents = require('../models/user_events');

const { body , validationResult } = require('express-validator');

var getAllEvent = function(req, res) {
    Event.find({}, function (err, events) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                title: 'List of Events',
                events: events
            });
        }
    });
};

var searchEventGet = function(req, res) {
    //Event.createIndex({name: "text", category: "text" });
    // Event.find({name: {$regex: new RegExp(req.query.search, "gi")}}, function (err, events) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.render('index', {
    //             title: 'List of Events',
    //             events: events
    //         });
    //     }
    // }).sort( { score: { $meta: "textScore" } } );
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(req.query.search, 'gi');
        // Get all campgrounds from DB
        Event.find({name: regex}, function(err, events){
            if(err){
                console.log(err);
            } else {
                if(events.length < 1) {
                    noMatch = "No events with that query! Showing all events.";
                    Event.find({}, function(err, events){
                        if(err){
                            console.log(err);
                        } else {
                            res.render("index",{title: 'List of Events',events: events, noMatch: noMatch});
                        }
                    });
                }
                else {
                    res.render("index", {title: 'List of Events', events: events, noMatch: noMatch});
                }
            }
        });
    } else {
        // Get all campgrounds from DB
        Event.find({}, function(err, events){
            if(err){
                console.log(err);
            } else {
                res.render("index",{title: 'List of Events',events: events, noMatch: noMatch});
            }
        });
    }
};

module.exports.getAllEvent = getAllEvent;
module.exports.searchEventGet = searchEventGet;