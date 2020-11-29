require('dotenv').config();
const express = require("express");
const fetch = require("node-fetch");
import {Charger} from "./dataObjects";
import {Connection} from "./dataObjects";

export async function fetchCharge (res, url: string, id: string): Promise<any> {
  try {
    console.log("in fetchDetail")
    let apicall = [url, `chargepointid=${id}`, `maxresults=10`, `verbose=false`].join("&");
    // console.log(apicall );

    const results = await fetch(apicall );
    const data: any  = await results.json();
    console.log(data);

    const crg: any = data[0];
    
   
    // copy conections into array
    let connections: Connection[] = [];
    let connector: Connection = {typeId: 0, levelId: 0};

    crg.Connections.forEach(connect => {
      connector.typeId = connect.ConnectionTypeID;
      connector.levelId = connect.LevelID;
      connections.push(connector);
    });

    //copy data into charger record
    let charger : Charger = {
      id: crg.ID,
      address: {
        addressLine: crg.AddressInfo.AddressLine1,
        title: crg.AddressInfo.Title,
        town: crg.AddressInfo.Town,
        state: crg.AddressInfo.StateOrProvince,
        postalCode: crg.AddressInfo.Postcode,
      },
      connectionType: connections,
      usage: crg.UsageTypeID,
    }

    if (crg.OperatorInfo){
      charger.operatorTitle = crg.OperatorInfo.Title,
      charger.website = crg.OperatorInfo.WebsiteURL
    }
    console.log(charger);
    res.render('details', {charger: charger})
  } catch (error) {
    // TODO: output error page
    console.log(error);
    // res.render('error', {error: error})
  }
}

