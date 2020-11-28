require("dotenv").config();
const express = require("express");
import { Location } from "./dataObjects";
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
    res
  ) {
    let chargers: Location[] = [];

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
          ]);

          // console.log(ret);

          request(ret, function (error: any, response: any, body: any): any {
            if (!error && response.statusCode == 200) {
              let json_body = JSON.parse(body);
              console.log(json_body)
              let jb: any = 0;
              
              // for each charger returned grab the location
              // information and push into array of chargers
              json_body.forEach (jb => {
                  const location: Location = {
                    id: jb.ID,
                    address: {
                      addressLine: jb.AddressInfo.AddressLine1,
                      title: jb.AddressInfo.Title,
                      town: jb.AddressInfo.Town,
                      state: jb.AddressInfo.StateOrProvince,
                      postalCode: jb.AddressInfo.Postcode,
                    },
                    pos: {
                      lat: jb.AddressInfo.Latitude,
                      lng: jb.AddressInfo.Longitude,
                    }
                  };
                  console.log(location);
                  chargers.push(location);
                  console.log(jb);
              });
            res.render("results_list", { chargers: chargers });
            // res.render("search_results", { Title: 'in api_link' });
            } 

          });
        }
      }
    );
  },
};



