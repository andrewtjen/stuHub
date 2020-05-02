var mongoose = require('mongoose');
let Event = require('../models/event');
let UserEvents = require('../models/user_events');

const { body , validationResult } = require('express-validator');

var getAllEvent = function(req, res) {
    Event.find({}, function(err, events) {
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
let sortEvents = function(events,sortBy){
    if (sortBy == 'newestcreated') {
        return events.sort(function(a, b) {
            a = new Date(a.createdAt);
            b = new Date(b.createdAt);
            return a<b ? -1 : a>b ? 1 : 0;
        });
    } else if (sortBy == 'latestcreated') {
        return events.sort(function(a, b) {
            a = new Date(a.createdAt);
            b = new Date(b.createdAt);
            return a>b ? -1 : a<b ? 1 : 0;
        });;
    } else if (sortBy == '') {
        return events;
    } else if(sortBy == 'happeningsoon'){
        return events.sort(function(a, b) {
            a = new Date(a.datetime);
            b = new Date(b.datetime);
            return a<b ? -1 : a>b ? 1 : 0;
        });
    } else if(sortBy == 'happeninglatest'){
        return events.sort(function(a, b) {
            a = new Date(a.datetime);
            b = new Date(b.datetime);
            return a>b ? -1 : a<b ? 1 : 0;
        });
    } else if(sortBy == 'capacity'){
        return events.sort(events.capacity);
    }
    return events;
}

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
    // }).sort( { score: { $meta: "textScore" } } );4

    var noMatch = null;
    const filterBy = req.query.filterBy;
    let sortBy = req.query.sortBy;
    if(filterBy.length < 1) {
        if (req.query.search) {
            const regex = new RegExp(req.query.search, 'gi');
            Event.find({name: regex}, function (err, events) {
                if (err) {
                    console.log.err
                } else {
                    if (events.length < 1) {
                        noMatch = "No events with that query! Showing all events.";
                        Event.find({}, function (err, events) {
                            if (err) {
                                console.log(err)
                            } else {
                                events = sortEvents(events, sortBy);
                                res.render("index", {title: 'List of Events', events: events, noMatch: noMatch});
                            }
                        });
                    } else {
                        events = sortEvents(events, sortBy);
                        res.render("index", {title: 'List of Events', events: events, noMatch: noMatch});
                    }
                }
            });
        } else {
            Event.find({}, function (err, events) {
                if (err) {
                    console.log(err)
                } else {
                    events = sortEvents(events, sortBy);
                    res.render("index", {title: 'List of Events', events: events, noMatch: noMatch});
                }
            });
        }
    }
    else{
        if (req.query.search) {
            const regex = new RegExp(req.query.search, 'gi');
            Event.find({name: regex, category: filterBy}, function (err, events) {
                if (err) {
                    console.log.err
                } else {
                    if (events.length < 1) {
                        noMatch = "No events with that query! Showing all events.";
                        Event.find({category: filterBy}, function (err, events) {
                            if (err) {
                                console.log(err)
                            } else {
                                events = sortEvents(events, sortBy);
                                res.render("index", {title: 'List of Events', events: events, noMatch: noMatch});
                            }
                        });
                    } else {
                        events = sortEvents(events, sortBy);
                        res.render("index", {title: 'List of Events', events: events, noMatch: noMatch});
                    }
                }
            });
        } else {
            Event.find({category: filterBy}, function (err, events) {
                if (err) {
                    console.log(err)
                } else {
                    events = sortEvents(events, sortBy);
                    res.render("index", {title: 'List of Events', events: events, noMatch: noMatch});
                }
            });
        }
    }
};

module.exports.getAllEvent = getAllEvent;
module.exports.searchEventGet = searchEventGet;