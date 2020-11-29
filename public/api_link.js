"use strict";
exports.__esModule = true;
require("dotenv").config();
var express = require("express");
var renderResults_1 = require("./renderResults");
var mapKey = process.env.MAP_KEY;
var request = require("request-promise");
var googleMapsClient = require("@google/maps").createClient({
    key: mapKey
});
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
module.exports = {
    addr: function addr_to_latlng(addr, url, verbose, output, incl_comm, max_results, compact, distance, distance_u, res, req) {
        var gcode = googleMapsClient.geocode({
            address: addr
        }, function (err, response) {
            if (!err) {
                var lat = "latitude=" + response.json.results[0].geometry.location["lat"];
                var lng = "longitude=" + response.json.results[0].geometry.location["lng"];
                var ret = options([
                    url,
                    verbose,
                    output,
                    incl_comm,
                    max_results,
                    compact,
                    lat,
                    lng,
                    distance,
                    distance_u,
                ]);
                console.log(ret);
                request(ret, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var json_body = JSON.parse(body);
                        //   renderResults(res, json_body);
                        if (req.body.isPublic === "on")
                            renderResults_1.renderResults(res, json_body, true);
                        else
                            renderResults_1.renderResults(res, json_body, false);
                    }
                });
            }
        });
    }
};
