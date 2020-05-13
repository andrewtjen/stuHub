let mongoose = require('mongoose');
let Event = mongoose.model('event').schema;
let User =  mongoose.model('user').schema;


// Article Schema
let usereventSchema = mongoose.Schema({
    userid: {
        type: String
    },
    eventid: {
        type: String
    }
});
let userevents = module.exports = mongoose.model('user_events', usereventSchema);
