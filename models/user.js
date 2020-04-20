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
    }
  });

  let user = module.exports = mongoose.model('user', userSchema);
