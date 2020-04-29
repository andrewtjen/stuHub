let mongoose = require('mongoose');

// Article Schema
let usereventSchema = mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    eventid:{
        type: String,
        required: true
    },
    type:{
        enum: ["join","create"],
        required: true
    }
});

let userevents = module.exports = mongoose.model('user_events', usereventSchema);