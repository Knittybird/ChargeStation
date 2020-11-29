import { Location } from "./dataObjects";

export function renderResults(res, json_body, pub=false) {
    let chargers: Location[] = [];
    console.log(JSON.stringify(json_body, null, 2));

  // for each charger returned grab the location
  // information and push into array of chargers
  console.log(json_body);
  if(json_body.length < 1)
  {
      res.render("errors/no_results", {
        title : '0 Results',
        desc : 'Oops! Looks like we could not find what you were looking for...',
        search : "Search Again?"
      });
  }
  else {
  json_body.forEach((jb : any) => {
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
    
    if(pub===true && jb.UsageType.Title==="Public")
      chargers.push(location);
    else if(pub===false)
      chargers.push(location);

    // console.log(location);
    // console.log(JSON.stringify(jb, null, 2));
  });
  res.render("results_list", { chargers: chargers });
}
  
}
