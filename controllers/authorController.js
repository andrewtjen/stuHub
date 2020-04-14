// provide the controller a link to the author model
let authors = require('../models/author');
// Function to handle a request to get all authors
const getAllAuthors = (req, res) => {
    res.send(authors); // return the list of authors
};
// Remember to export the callbacks
module.exports = {
    getAllAuthors,
};
