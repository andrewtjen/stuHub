let authors = require('../models/author');
// Function to handle a request to a particular author
const getAuthorByID = (req, res) => {
// search for author in the database via ID
    const author = authors.find(author => author.id === req.params.id);
    if (author){
        res.send(author); // send back the author details
    }
    else{
// you can decide what to return if author is not found
// currently, an empty list will be return.
        res.send([]);
    }
};

module.exports = {
    getAuthorByID,
}