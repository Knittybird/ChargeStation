"use strict";
exports.__esModule = true;
var path = require("path");
var express = require('express');
var app = express();
var port = parseInt(process.env.PORT, 10) || 5000;
var request = require('request-promise');
var base = 'https://api.openchargemap.io/v3/poi/?';
var chargeKey = process.env.OPENCHARGE_KEY;
var mapKey = process.env.MAP_KEY;
var googleMapsClient = require('@google/maps').createClient({
    key: "AIzaSyBcUkvaCCtPiuJKP5UZfpzJsO90MfD7hRE"
});
var url = base + "key=8bc4f8db-272f-458b-82f7-c052a5c53c9a"; //+ chargeKey;
//const temp : string = `https://api.openchargemap.io/v3/poi/?key=${chargeKey}&output=json&countrycode=US&maxresults=10`;
var temp = "https://api.openchargemap.io/v3/poi/?key=8bc4f8db-272f-458b-82f7-c052a5c53c9a&verbose=false&output=json&includecomments=true&maxresults=10&compact=true&latitude=45.5051064&longitude=-122.6750261&distance=10&distanceunit=Mile"; //https://api.openchargemap.io/v3/poi/?key=8bc4f8db-272f-458b-82f7-c052a5c53c9a&output=json&maxresults=10&longitude=45.5051064&latitude=-122.6750261&countrycode=US&distance=1";
var gurl = "https://maps.googleapis.com/maps/api/js?key=" + mapKey + "&libraries=places&callback=initMap";
app.set('views', __dirname + '/../views');
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'maps.js')));
// public folder contains static file(s) that will be served
app.use(express.static('public'));
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
    console.log(process.env.OPENCHARGE_KEY);
    var output = "output=json";
    var distance = 'distance=' + req.body.radius;
    var country = 'countrycode=US';
    var distance_u = 'distanceunit=Miles';
    var compact = "compact=true";
    var verbose = "verbose=false";
    var incl_comm = "includecomments=true";
    var max_results = "maxresults=10";
    //let out_url : string = url + output;
    var out_url = googleMapsClient.geocode({
        address: req.body.location
    }, function (err, response) {
        if (!err) {
            var lat = "latitude=" + response.json.results[0].geometry.location['lat'];
            var lng = "longitude=" + response.json.results[0].geometry.location['lng'];
            var ret = options([url, verbose, output, incl_comm, max_results, compact, lat, lng, distance, distance_u]);
            console.log(ret);
            //if (ret === "https://api.openchargemap.io/v3/poi/?key=8bc4f8db-272f-458b-82f7-c052a5c53c9a&verbose=false&output=json&includecomments=true&maxresults=10&compact=true&latitude=45.5051064&longitude=-122.6750261&distance=10&distanceunit=Miles")
            request(ret, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var json_body = JSON.parse(body);
                    console.log(json_body);
                    //return json_body;
                }
            });
        }
    });
    res.render('directions_results', {
        Title: 'Results'
    });
});
app.listen(port, function () {
    console.log("Server running at http://localhost:" + port);
});
