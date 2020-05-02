let mongoose = require('mongoose');

// Article Schema
let eventSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  category:{
    type: String,
    enum: ["sports","studies","leisure","club activity"],
    required: true
  },
  location:{
    type: String,
    required: true
  },
  date:{
    type: Date,
    required: true
  },
  time:{
    type: String,
    required: true
  },
  datetime:{
    type: Date
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
  },
  isactive: {
    type: Boolean
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

let event = module.exports = mongoose.model('event', eventSchema);
