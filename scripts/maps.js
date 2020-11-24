"use strict";
exports.__esModule = true;
var js_api_loader_1 = require("@googlemaps/js-api-loader");
var loader = new js_api_loader_1.Loader({
    apiKey: process.env.MAP_KEY,
    version: "weekly"
});
loader.load().then(function () {
    var geocoder = new google.maps.Geocoder();
    var georeq = {
        'address': "1600+Amphitheatre+Parkway,+Mountain+View,+CA",
        'region': "USA"
    };
    geocoder.geocode(georeq, function (results, status) {
        if (status === "OK") {
            console.log(results);
        }
        else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
});
