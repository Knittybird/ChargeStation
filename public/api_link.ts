require('dotenv').config();
const mapKey  = process.env.MAP_KEY
const request = require('request-promise');
const googleMapsClient = require('@google/maps').createClient({
    key:mapKey
});

//console.log(process.env.OPENCHARGE_KEY);
    

    function options(options : string[]) : string{

        let output : string = "";
        let o  : string = ""
        for(o in options)
            if (output == "")
                output = options[o];
            else
                output += "&" + options[o];
    
        return output;
    
    }
    module.exports = {
    addr : function addr_to_latlng(addr : any, url : string, verbose : string, output : string, incl_comm : string, max_results : string, compact : string, distance : string, distance_u : string, res : any, req : any) {
    let t : object[] = [];

    let gcode : any = googleMapsClient.geocode({
    address: addr
    }, function(err : any, response : any ) {
    if (!err) {
        let lat : string = "latitude="+response.json.results[0].geometry.location['lat'];
        let lng : string = "longitude="+response.json.results[0].geometry.location['lng'];
        let ret : string = options([url,verbose, output, incl_comm, max_results, compact, lat, lng,distance, distance_u]);

       // console.log(ret);

        request(ret, function (error : any, response : any, body : any) : any{
            if (!error && response.statusCode == 200) {
                let json_body = JSON.parse(body);
                let jb : any = 0;
                t = [{"addr" : json_body[jb].AddressInfo['AddressLine1']}];
                //console.log(json_body[0].AddressInfo['AddressLine1'])
                for(jb in json_body)
                {
                    if(jb!==0) {
                        t.push({"addr" : json_body[jb].AddressInfo['AddressLine1']})
                        //console.log(results);
                    }
                    
                }
            
            }

            /*res.render('search_results', {
                Title : 'Results'
            });*/
        });
    }
    });
    }
    };
