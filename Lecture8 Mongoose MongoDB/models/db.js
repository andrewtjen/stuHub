var mongoose = require('mongoose');

const uri = "mongodb+srv://daniel:daniel321@cluster0-bmldn.mongodb.net/INFO30005?retryWrites=true&w=majority";

mongoose.connect(uri,
    function(err){
    if(!err){
        console.log('Connected to mongo.');
    }else{
        console.log('Failed to connect to mongo!', err);
    }
});

require('./cafe.js');
