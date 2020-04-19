var mongoose = require('mongoose');

const uri = "mongodb+srv://wintan:123@cluster0-d2k2z.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri,
    function(err){
    if(!err){
        console.log('Connected to mongo.');
    }else{
        console.log('Failed to connect to mongo!', err);
    }
});

require('./cafe.js');
