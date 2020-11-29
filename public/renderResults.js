"use strict";
exports.__esModule = true;
exports.renderResults = void 0;
function renderResults(res, json_body, pub) {
    if (pub === void 0) { pub = false; }
    var chargers = [];
    // for each charger returned grab the location
    // information and push into array of chargers
    json_body.forEach(function (jb) {
        var location = {
            id: jb.ID,
            address: {
                addressLine: jb.AddressInfo.AddressLine1,
                title: jb.AddressInfo.Title,
                town: jb.AddressInfo.Town,
                state: jb.AddressInfo.StateOrProvince,
                postalCode: jb.AddressInfo.Postcode
            },
            pos: {
                lat: jb.AddressInfo.Latitude,
                lng: jb.AddressInfo.Longitude
            }
        };
        if (pub === true && jb.UsageType.Title === "Public")
            chargers.push(location);
        else if (pub === false)
            chargers.push(location);
        // console.log(location);
        // console.log(jb);
    });
    res.render("results_list", { chargers: chargers });
}
exports.renderResults = renderResults;