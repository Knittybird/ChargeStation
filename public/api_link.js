var mapKey = process.env.MAP_KEY;
var request = require('request-promise');
var googleMapsClient = require('@google/maps').createClient({
    key: mapKey
});
//console.log(process.env.OPENCHARGE_KEY);
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
    addr: function addr_to_latlng(addr, url, verbose, output, incl_comm, max_results, compact, distance, distance_u) {
        googleMapsClient.geocode({
            address: addr
        }, function (err, response) {
            if (!err) {
                var lat = "latitude=" + response.json.results[0].geometry.location['lat'];
                var lng = "longitude=" + response.json.results[0].geometry.location['lng'];
                var ret = options([url, verbose, output, incl_comm, max_results, compact, lat, lng, distance, distance_u]);
                console.log(ret);
                request(ret, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var json_body = JSON.parse(body);
                        console.log(json_body);
                        //we'll need to return an object with the relevant data
                        //return json_body;
                    }
                });
            }
        });
    }
};
