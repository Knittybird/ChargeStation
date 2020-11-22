"use strict";
exports.__esModule = true;
var express = require('express');
var app = express();
var port = parseInt(process.env.PORT, 10) || 5000;
var request = require('request-promise');
var base = 'https://api.openchargemap.io/v3/?';
//const maps : any = require(__dirname + '\\maps.js'); //'https://api.openchargemap.io/v3/'
var chargeKey = process.env.OPENCHARGE_KEY;
var mapKey = process.env.MAP_KEY;
var googleMapsClient = require('@google/maps').createClient({
    key: "AIzaSyBcUkvaCCtPiuJKP5UZfpzJsO90MfD7hRE"
});
var url = base + 'key=' + chargeKey;
var temp = "https://api.openchargemap.io/v3/poi/?key=" + chargeKey + "&output=json&countrycode=US&maxresults=20";
var gurl = "https://maps.googleapis.com/maps/api/js?key=" + mapKey + "&libraries=places&callback=initMap";
app.set('views', __dirname + '/../views');
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded());
function options(options) {
    var output = "";
    var o = "";
    for (o in options)
        if (output == "")
            output = options[o];
        else
            output += "&" + options[o];
    return output;
}
var results = [];
//Figure out charger info/route info
request(temp, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var json_body = JSON.parse(body);
        //console.log(json_body)
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
    console.log(req.body);
    //todo: search api for location and charger
    var distance = 'distance=' + req.body.radius;
    var country = 'countrycode=US';
    var distance_u = 'distanceunit=Miles';
    // Geocode an address.
    googleMapsClient.geocode({
        address: '1600 Amphitheatre Parkway, Mountain View, CA'
    }, function (err, response) {
        if (!err) {
            console.log(response.json.results);
        }
    });
    //TODO IMPORT GOOGLE MAPS LAT/LONG
    var ret = options([url, distance, country, distance_u]);
    console.log(ret);
    res.render('directions_results', {
        Title: 'Results'
    });
});
app.listen(port, function () {
    console.log("Server running at http://localhost:" + port);
});
