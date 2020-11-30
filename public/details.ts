require('dotenv').config();
const express = require("express");
const fetch = require("node-fetch");
import {Charger} from "./dataObjects";
import {Connection} from "./dataObjects";

export async function fetchCharge (res, url: string, id: string): Promise<any> {
  try {
    let apicall = [url, `chargepointid=${id}`, `maxresults=10`, `verbose=false`].join("&");


    const results = await fetch(apicall );
    const data: any  = await results.json();
    // console.log(JSON.stringify(data, null, 2))

    const charger: Charger = parseDetailData(data[0]);
    // console.log(JSON.stringify(charger, null, 2));
    res.render('details', {charger: charger})

  } catch (error) {
    // TODO: output error page
    console.log(error);
    // res.render('error', {error: error})
  }
}

export function parseDetailData (chargeData: any): Charger  {

    // copy conections into array
    let connections: Connection[] = [];

    if (chargeData.Connections) {
      chargeData.Connections.forEach (connect => {
        let connector: Connection = {typeId: 0, levelId: 0};
        connector.typeId = connect.ConnectionTypeID;
        connector.levelId = connect.LevelID;
        connections.push(connector);
      });
    }

    //copy data into charger record
    let charger : Charger = {
      id: chargeData.ID.toString(),
      address: {
        addressLine: chargeData.AddressInfo.AddressLine1,
        title: chargeData.AddressInfo.Title,
        town: chargeData.AddressInfo.Town,
        state: chargeData.AddressInfo.StateOrProvince,
        postalCode: chargeData.AddressInfo.Postcode,
      },
      connectionType: connections,
      usage: "",
    }

    if (chargeData.OperatorInfo){
      charger.operatorTitle = chargeData.OperatorInfo.Title,
      charger.website = chargeData.OperatorInfo.WebsiteURL
    }
    if (chargeData.UsageTypeID){
      charger.usage = chargeData.UsageTypeID.toString();
    }
    return charger;
}

