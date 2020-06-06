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
    type: Object,
    required: ["name", "lat", "lng"],
    properties: {
      name: {
        type: String,
        required: true
      },
      lat: {
        type: Number,
        required: true
      },
      lng: {
        type: Number,
        required: true
      }
    }
    
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
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

let event = module.exports = mongoose.model('event', eventSchema);
