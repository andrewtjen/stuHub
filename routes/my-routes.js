const express = require("express");

const myRoutes = express.Router();

//const authorController = require("../controllers")

myRoutes.get("/", (req, res) => res.send('<H1>System</H1>'));

module.exports = myRoutes;