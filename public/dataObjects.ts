/* defines objects to pass data from backend to frontend  */

export interface Location{
  id: string;
  address: {
    addressLine: string;
    title: string;
    town: string;
    state: string;
    postalCode: string;
  },
  pos?: {
    lat?: string;
    lng?: string;
  }
}

export interface Charger extends Location{
  connectionType: Connection[];
  usage: string;
  operatorTitle?: string;
  website?: string;
}

export interface Connection {
  typeId: number;
  levelId: number;
}
