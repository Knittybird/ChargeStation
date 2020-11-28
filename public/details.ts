require('dotenv').config();
const express = require("express");
const fetch = require("node-fetch");
const app = express();
import {Charger} from "./dataObjects"
type Connector = [number, number]

export async function fetchCharge (url: string, id: string): Promise<any> {
  try {
    console.log("in fetchDetail")
    let apicall = [url, `chargepointid=${id}`, `maxresults=10`, `verbose=false`].join("&");
    console.log(apicall );

    const results = await fetch(apicall );
    const data: any  = await results.json();
    console.log(data);
    const crg: any = data[0];
    // this is an array of connection [typeID, level]
    let connections: Connector[] = [[1,2]];
    connections.pop();    // It seems the only way to define type
    // console.log(data.length);
    console.log(typeof connections)

    crg.Connections.forEach(connect => {
      connections.push([connect.ConnectionTypeID, connect.LevelID]);
      // console.log(connect)
    });

    let charger : Object = {
      id: crg.ID,
      address: {
        addressLine: crg.AddressInfo.AddressLine1,
        title: crg.AddressInfo.Title,
        town: crg.AddressInfo.Town,
        state: crg.AddressInfo.StateOrProvince,
        postalCode: crg.AddressInfo.PostCode,
      },
      connectionType: connections,
      usage: crg.UsageTypeID,
    }

    if (crg.OperatorInfo){
      charger.operatorTitle = crg.OperatorInfo.Title,
      charger.website = crg.OperatorInfo.WebsiteURL
    }
    console.log(charger);
  } catch (error) {
    // TODO: output error page
    console.log(error);
  }
}

