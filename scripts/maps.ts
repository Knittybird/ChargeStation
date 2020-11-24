import {Loader} from "@googlemaps/js-api-loader";

    const loader = new Loader({
        apiKey: process.env.MAP_KEY,
        version: "weekly",
    });

    loader.load().then(() => {
    let geocoder : any = new google.maps.Geocoder();
    let georeq = {
        'address' : "1600+Amphitheatre+Parkway,+Mountain+View,+CA",
        'region' : "USA"
    };

    geocoder.geocode(georeq, (results, status) => {
        if (status === "OK") {
          console.log(results);
        } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
      });
    })



    