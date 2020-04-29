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
  current_attendees: {
    type: Number,
    required: false
  },
  isactive: {
    type: Boolean
  }
});

let event = module.exports = mongoose.model('event', eventSchema);
