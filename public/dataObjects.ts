/* defines objects to pass data from backend to frontend  */

//module.exports = {
  export interface Charger {
  address: {
    addressLine: string;
    title: string;
    town: string;
    state: string;
    postalCode: string;
  },
  pos: {
    lat: string
    lng: string
  }
}
//}