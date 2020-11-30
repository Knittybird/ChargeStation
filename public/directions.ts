require("dotenv").config();
const express = require("express");
import {dirResults} from "./dir_results";
const mapKey = process.env.MAP_KEY;
const request = require("request-promise");
const googleMapsClient = require("@google/maps").createClient({
  key: mapKey,
});

function options(options: string[]): string {
  let output: string = "";
  let o: string = "";
  for (o in options)
    if (output == "") output = options[o];
    else output += "&" + options[o];

  return output;
}
module.exports = {
  results: async function search_results(
    origin: string,
    dest : string,
    url: string,
    verbose: string,
    output: string,
    incl_comm: string,
    max_results: string,
    compact: string,
    connection_type : string,
    level_id : string,
    res : any,
    req : any
  ) {

    console.log(res);
    await googleMapsClient.geocode(
      {
        address: origin,
      },
      async function (err: any, response: any) {
        if (!err) {
            let org_lat_lng :  string =
                    "(" + response.json.results[0].geometry.location["lat"] + "," +response.json.results[0].geometry.location["lng"] + ")";
            await googleMapsClient.geocode(
                {
                  address: dest,

                }, async function (err: any, response: any) {
                    if (!err) {
                        let dest_lat_lng :  string =
                            "(" + response.json.results[0].geometry.location["lat"] + "," +response.json.results[0].geometry.location["lng"] + ")";
                    
                    let bound_box : string = "boundingbox=" + org_lat_lng + "," + dest_lat_lng;

                    let ret: string = options([
                        url,
                        verbose,
                        output,
                        incl_comm,
                        max_results,
                        compact,
                        bound_box,
                        connection_type,
                        level_id
                    ]);

                    // if (req.body.isPublic === "on") {
                    //     ret = ret + '&usagetypeid=1,4,5,7';
                    // }

                    console.log(ret);

                    request(ret, function (error: any, response: any, body: any): any {
                        if (!error && response.statusCode == 200) {
                        let json_body = JSON.parse(body);
                        console.log(json_body);
                        dirResults(res, json_body);
                            // if (req.body.isPublic === "on")  // functoinality not used
                            //     renderResults(res, json_body, false);
                            // else
                            //     renderResults(res, json_body, false);
                        } 
                    });
                }
              });
            }
         });
        }
    }
        

                   

