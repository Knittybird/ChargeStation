const mapKey  = process.env.MAP_KEY
const request = require('request-promise');
const googleMapsClient = require('@google/maps').createClient({
    key:mapKey
});

//console.log(process.env.OPENCHARGE_KEY);
    

    function options(options) {

        let output = "";
        let o  = ""
        for(o in options)
            if (output == "")
                output = options[o];
            else
                output += "&" + options[o];
    
        return output;
    
    }
    module.exports = {
    addr : function addr_to_latlng(addr, url, verbose, output, incl_comm, max_results, compact, distance, distance_u) {
    //let out_url : string = url + output;
    googleMapsClient.geocode({
    address: addr
    }, function(err, response ) {
    if (!err) {
        let lat = "latitude="+response.json.results[0].geometry.location['lat'];
        let lng = "longitude="+response.json.results[0].geometry.location['lng'];
        let ret = options([url,verbose, output, incl_comm, max_results, compact, lat, lng,distance, distance_u]);

        console.log(ret);

        request(ret, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let json_body = JSON.parse(body);
                console.log(json_body)
        
                //return json_body;
            }
        });
    }
    });
    }
    };
