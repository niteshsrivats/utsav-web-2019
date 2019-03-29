var express = require('express');
var http = require('http');
var path = require('path');
var logger = require("morgan");
var events = require('./events');
var team = require('./team');
var gallery = require('./gallery');
var app = express();
const PORT = process.env.PORT || 80

process.env.NODE_ENV = 'production';

app.use(logger("dev"));

app.set("views", path.resolve(__dirname, "views"));
var publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));

app.use(function(request, response, next) {
    console.log("In comes a " + request.method + " to " + request.url);
    next();
});

app.get('/', function(req, res) {
    app.locals.json = events;
    app.locals.gallery = gallery;
    res.render("index");
});

app.get('/ticket', function(req, res) {
    app.locals.json = events;
    res.render("ticket");
});

app.get('/tt', function(req, res) {
    res.render("tt");
});

app.get('/team', function(req, res) {
    // app.locals.gallery = gallery;
    res.render("team");
});

app.get('/*', function(req, res) {
    res.render("404");
});

app.set("view engine", "ejs");

app.listen(PORT, function() {
    console.log("Started at " + PORT);
})


