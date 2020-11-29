import {Charger} from "./dataObjects";
require('dotenv').config();
const mapKey  = process.env.MAP_KEY
const request = require('request-promise');
const googleMapsClient = require('@google/maps').createClient({
    key:mapKey
});

    

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
    export async function load_api(res : any, req : any) {

        const base : string = 'https://api.openchargemap.io/v3/poi/?'; 
        const chargeKey : string = process.env.OPENCHARGE_KEY
        const mapKey : string = process.env.MAP_KEY
        const url : string = `${base}key=${chargeKey}`; //+ chargeKey;
        let output : string = "output=json";
        let distance : string= 'distance=' + req.body.radius;
        let distance_u :string = 'distanceunit=Miles';
        let compact :string = "compact=false";
        let verbose :string = "verbose=true";
        let incl_comm :string = "includecomments=true";
        let max_results:string  = "maxresults=10";
        let connection_type : string = "";
        let level_id : string = "";
        //let charger : any = require('../../public/dataObjects.js');
        //console.log(charger);
        if(req.body.connectionType != undefined)
            connection_type = `connectiontypeid=${req.body.connectionType.toString()}`;
        if(req.body.chargerType != undefined)
            level_id = `levelid=${req.body.chargerType.toString()}`;
        let addr : any= req.body.location
        //let api = require('../../public/api_link.js');
        let results : Charger[] = [];
        const googleMapsClient = require('@google/maps').createClient({
            key:mapKey
        });
        //const I : any = require("../../public/dataObjects.ts");
        //let t : any = api.addr(address, url,verbose, output, incl_comm, max_results, compact,distance, distance_u, req, res);
    
        googleMapsClient.geocode({
            address: addr
            }, function(err : any, response : any ) {
            if (!err) {
                let lat : string = "latitude="+response.json.results[0].geometry.location['lat'];
                let lng : string = "longitude="+response.json.results[0].geometry.location['lng'];
                let ret : string = "";
                ret = options([url,verbose, output, incl_comm, max_results, compact, lat, lng,distance, distance_u, connection_type, level_id]); //, connection_type
    
                console.log(ret);
                console.log(req.body);
    
                request(ret, function (error : any, response : any, body : any) : any {
    
                    if (!error && response.statusCode == 200) {
                        let json_body = JSON.parse(body);
                        console.log(json_body);
                        let jb : any = 0;
                        if(json_body != [] && json_body[0])
                        {
    
                            //console.log(json_body[0].AddressInfo['AddressLine1'])
                            for(let i : number = 1; i < json_body.length; ++i)
                            {
                                if(results === []) {
                                    results = [{
                                        'id' : json_body[i].AddressInfo['ID'],
                                        'address' : {
                                        'addressLine' : json_body[i].AddressInfo['AddressLine1'],
                                        'title' : json_body[i].AddressInfo['Title'],
                                        'town' : json_body[i].AddressInfo['Town'],
                                        'state' : json_body[i].AddressInfo['StateOrProvince'],
                                        'postalCode' : json_body[i].AddressInfo['Postcode'],
                                    },
                                    'pos': {
                                        lat: json_body[i].AddressInfo['Latitude'],
                                        lng: json_body[i].AddressInfo['Longitude']
                                    }}];
                                }
    
                                else
                                {
                                    results.push({
                                        'id' : json_body[i].AddressInfo['ID'],
                                        'address' : {
                                        'addressLine' : json_body[i].AddressInfo['AddressLine1'],
                                        'title' : json_body[i].AddressInfo['Title'],
                                        'town' : json_body[i].AddressInfo['Town'],
                                        'state' : json_body[i].AddressInfo['StateOrProvince'],
                                        'postalCode' : json_body[i].AddressInfo['Postcode']
                                        //'connections' : json_body[jb].AddressInfo['Connections']
                                    },
                                    'pos': {
                                        lat: json_body[i].AddressInfo['Latitude'],
                                        lng: json_body[i].AddressInfo['Longitude']
                                    }})
                                }
                                
                                console.log(results);  
                                //TODO -- FILETER RESULTS
                                //console.log(results.pos)
                            }
    
                        
                        
                        res.render('results_list', {
                            //Title : 'Results',
                            chargers : results
                            });
                        }
    
                        else {
                            console.log("we need another error page");
                            res.render('errors/no_results', {
                                title: "0 results",
                                desc: "Looks like we couldn't find what you were looking for... Try widening the radius or changing the charging level. Fewer search parameters will geneerate more results",
                                search: "Search Again"
                            });
                        }
                    }
                    
                    else {
                        res.render('errors/error', {});
                    }
                
                    
                });
    
            }
            });
     
    }
    

       //res.render('search_results', {
        // Title : 'Results'
        // });
    
    /*let t : object[] = [];

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

            res.render('search_results', {
                Title : 'Results'
            });
        });
        });
    }
    };*/