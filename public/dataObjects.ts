/* defines objects to pass data from backend to frontend  */

<<<<<<< HEAD
//module.exports = {
  export interface Charger {
=======
export interface Charger{
  id: string;
>>>>>>> 6543677588112b8a85358fd6433e87dabb362965
  address: {
    addressLine: string;
    title: string;
    town: string;
    state: string;
    postalCode: string;
  },
  pos: {
    lat?: string;
    lng?: string;
  }
<<<<<<< HEAD
}
//}
=======
  
}
>>>>>>> 6543677588112b8a85358fd6433e87dabb362965
