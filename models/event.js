let mongoose = require('mongoose');

// Article Schema
let eventSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  date:{
    type: String,
    required: true
  },
  time:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: false
  },
  creatorID:{
    type: String,
    required: true
  },
  capacity:{
    type: Number,
    required: true
  },
  attendants: {
    type: [String],
    uniqueItems: true
  },
  current_attendees:{
    type: Number,
    required: false
  }
});

let event = module.exports = mongoose.model('Event', eventSchema);
