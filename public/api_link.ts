require("dotenv").config();
const express = require("express");
import {renderResults} from "./renderResults";
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
  res: function options(options: string[]): string {
    let output: string = "";
    let o: string = "";
    for (o in options)
      if (output == "") output = options[o];
      else output += "&" + options[o];
  
    return output;
  },
  addr: function addr_to_latlng(
    addr: any,
    url: string,
    verbose: string,
    output: string,
    incl_comm: string,
    max_results: string,
    compact: string,
    distance: string,
    distance_u: string,
    connection_type : string,
    level_id : string,
    res : any,
    req : any
  ) {

    let gcode: any = googleMapsClient.geocode(
      {
        address: addr,
      },
      function (err: any, response: any) {
        if (!err) {
          let lat: string =
            "latitude=" + response.json.results[0].geometry.location["lat"];
          let lng: string =
            "longitude=" + response.json.results[0].geometry.location["lng"];
          let ret: string = options([
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
            connection_type,
            level_id
          ]);

          if (req.body.isPublic === "on") {
            ret = ret + '&usagetypeid=1,4,5,7';
          }


          request(ret, function (error: any, response: any, body: any): any {
            if (!error && response.statusCode == 200) {
              let json_body = JSON.parse(body);
            //   renderResults(res, json_body);
                if (req.body.isPublic === "on")  // functoinality not used
                    renderResults(res, json_body, false);
                else
                    renderResults(res, json_body, false);
            } 

          });
        }
      }
    );
  },
};



