"use strict";
exports.__esModule = true;
var path = require("path");
require('dotenv').config();
var express = require('express');
var app = express();
var port = parseInt(process.env.PORT, 10) || 5000;
var request = require('request-promise');
var base = 'https://api.openchargemap.io/v3/poi/?';
var chargeKey = process.env.OPENCHARGE_KEY;
var mapKey = process.env.MAP_KEY;
var url = base + "key=" + chargeKey; //+ chargeKey;
//const temp : string = `https://api.openchargemap.io/v3/poi/?key=${chargeKey}&output=json&countrycode=US&maxresults=10`;
var temp = "https://api.openchargemap.io/v3/poi/?key=" + chargeKey + "&verbose=false&output=json&includecomments=true&maxresults=10&compact=true&latitude=45.5051064&longitude=-122.6750261&distance=10&distanceunit=Mile"; //https://api.openchargemap.io/v3/poi/?key=8bc4f8db-272f-458b-82f7-c052a5c53c9a&output=json&maxresults=10&longitude=45.5051064&latitude=-122.6750261&countrycode=US&distance=1";
var gurl = "https://maps.googleapis.com/maps/api/js?key=" + mapKey + "&libraries=places&callback=initMap";
app.set('views', __dirname + '/../views');
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '\\..\\public')));
// public folder contains static file(s) that will be served
//app.use(express.static('public'))
var results = [];
//Figure out charger info/route info
request(temp, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var json_body = JSON.parse(body);
        return json_body;
    }
});
var gmaps = request(gurl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        return body;
    }
});
var pos;
var map;
function initMap() {
    // Set the default location and initialize all variables
    pos = { lat: -33.857, lng: 151.213 };
    map = new gmaps.google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
    });
}
app.get('/', function (req, res) {
    res.render('index', {
        Title: 'Home'
    });
});
app.get('/gmaps', function (req, res) {
    res.render('gmaps', {
        Title: 'Home'
    });
});
app.get('/index', function (req, res) {
    res.render('index', {
        Title: 'Home'
    });
});
app.get('/directions', function (req, res) {
    res.render('directions', {
        Title: 'Directions'
    });
});
app.get('/about', function (req, res) {
    res.render('about', {
        Title: 'About'
    });
});
app.get('/search', function (req, res) {
    res.render('search', {
        Title: 'Search'
    });
});
app.post('/search_results', function (req, res) {
    var output = "output=json";
    var distance = 'distance=' + req.body.radius;
    var country = 'countrycode=US';
    var distance_u = 'distanceunit=Miles';
    var compact = "compact=true";
    var verbose = "verbose=false";
    var incl_comm = "includecomments=true";
    var max_results = "maxresults=10";
    var address = req.body.location;
    var q = require('../public/api_link.js');
    //console.log(q.addr(address, url,verbose, output, incl_comm, max_results, compact,distance, distance_u))
    q.addr(address, url, verbose, output, incl_comm, max_results, compact, distance, distance_u);
    res.render('search_results', {
        Title: 'Results'
    });
});
app.post('/directions_results', function (req, res) {
    res.render('search_results', {
        Title: 'Results'
    });
});
app.listen(port, function () {
    console.log("Server running at http://localhost:" + port);
});
// const express = require('express');
// const path = require('path');
// const app = express();
// const port = process.env.PORT || 5000;
// // specify the URL route and the file structure route
// app.use('/images', express.static('images'));
// // send a specific file to be served to the client
// app.get('/about', (req, res) => {
// res.sendFile(path.join(__dirname + '/public/about.html'));
// });
// app.listen(port, () => {
// console.log(`Server running at http://localhost:${port}`);
// }); 
