import { Location } from "./dataObjects";

export function dirResults(res, json_body) {
  let chargers: Location[] = [];

  // for each charger returned grab the location
  // information and push into array of chargers
  if (json_body.length < 1) {
    res.render("errors/no_results", {
      title: "0 Results",
      desc: "Oops! Looks like we could not find what you were looking for...",
      search: "Search Again?",
    });
  } else {
    json_body.forEach((jb: any) => {
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
        },
      };
      chargers.push(location);
    });
    res.render("results_list", { chargers: chargers });
  }
}
