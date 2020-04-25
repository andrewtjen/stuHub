var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    required: true
  },
  joined_events: {
    type: [String]
  },
  created_events: {
    type: [String]
  }
});

let user = module.exports = mongoose.model('user', userSchema);
