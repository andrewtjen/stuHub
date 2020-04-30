var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  passwordResetToken:{
    type: String
  },
  passwordResetExpire: {
    type: Date
  }
});

let user = module.exports = mongoose.model('user', userSchema);
