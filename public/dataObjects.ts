/* defines objects to pass data from backend to frontend  */

export interface Charger{
  id: string;
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
  
}