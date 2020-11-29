// const fetchDetails = require('../dist/public/details.js');
import {parseDetailData} from '../public/details';
// const fetch = require('node-fetch');
import {Charger} from "../public/dataObjects"
import {Connection} from "../public/dataObjects"

// jest.mock('fetch');
function sum (a,b) {return a + b};



  const input1: any = {
      "UsageType": {
        "ID": 1,
        "Title": "Public"
      },
      "StatusType": {
        "IsUserSelectable": true,
        "ID": 0,
        "Title": "Unknown"
      },
      "SubmissionStatus": {
        "IsLive": true,
        "ID": 100,
        "Title": "Imported and Published"
      },
      "IsRecentlyVerified": false,
      "ID": 9215,
      "UUID": "EFB22A04-3CCF-4F66-B146-AA54F495E440",
      "DataProviderID": 15,
      "DataProvidersReference": "10397",
      "OperatorID": 14,
      "UsageTypeID": 1,
      "AddressInfo": {
        "ID": 9112,
        "Title": "150 S Beavercreek Rd",
        "AddressLine1": "150 S Beavercreek Rd",
        "Town": "Oregon City",
        "StateOrProvince": "OR",
        "Postcode": "97045",
        "CountryID": 2,
        "Country": {
          "ISOCode": "US",
          "ContinentCode": "NA",
          "ID": 2,
          "Title": "United States"
        },
        "Latitude": 45.334205,
        "Longitude": -122.59962,
        "ContactTelephone1": "503-892-7345 ",
        "RelatedURL": "http://carstations.com/10397",
        "DistanceUnit": 0
      },
      "Connections": [
        {
          "ID": 6896,
          "ConnectionTypeID": 9,
          "ConnectionType": {
            "IsDiscontinued": false,
            "IsObsolete": false,
            "ID": 9,
            "Title": "NEMA 5-20R"
          },
          "Reference": "NEMA5",
          "LevelID": 1,
          "Level": {
            "Comments": "Under 2 kW, usually domestic socket types",
            "IsFastChargeCapable": false,
            "ID": 1,
            "Title": "Level 1 : Low (Under 2kW)"
          }
        }
      ],
      "NumberOfPoints": 1,
      "StatusTypeID": 0,
      "DataQualityLevel": 2,
      "DateCreated": "2012-01-23T15:12:00Z",
      "SubmissionStatusTypeID": 100
    };
    
    const input2: any = {
      "OperatorInfo": {
        "WebsiteURL": "http://www.shorepower.com/",
        "Comments": "Imported by ADFC import",
        "IsPrivateIndividual": false,
        "ID": 14,
        "Title": "Shorepower"
      },
      "UsageType": {
        "ID": 1,
        "Title": "Public"
      },
      "StatusType": {
        "IsUserSelectable": true,
        "ID": 0,
        "Title": "Unknown"
      },
      "SubmissionStatus": {
        "IsLive": true,
        "ID": 100,
        "Title": "Imported and Published"
      },
      "IsRecentlyVerified": false,
      "ID": 9215,
      "UUID": "EFB22A04-3CCF-4F66-B146-AA54F495E440",
      "DataProviderID": 15,
      "DataProvidersReference": "10397",
      "OperatorID": 14,
      "UsageTypeID": 1,
      "AddressInfo": {
        "ID": 9112,
        "Title": "150 S Beavercreek Rd",
        "AddressLine1": "150 S Beavercreek Rd",
        "Town": "Oregon City",
        "StateOrProvince": "OR",
        "Postcode": "97045",
        "CountryID": 2,
        "Country": {
          "ISOCode": "US",
          "ContinentCode": "NA",
          "ID": 2,
          "Title": "United States"
        },
        "Latitude": 45.334205,
        "Longitude": -122.59962,
        "ContactTelephone1": "503-892-7345 ",
        "RelatedURL": "http://carstations.com/10397",
        "DistanceUnit": 0
      },
      "Connections": [
        {
          "ID": 6896,
          "ConnectionTypeID": 9,
          "ConnectionType": {
            "IsDiscontinued": false,
            "IsObsolete": false,
            "ID": 9,
            "Title": "NEMA 5-20R"
          },
          "Reference": "NEMA5",
          "LevelID": 1,
          "Level": {
            "Comments": "Under 2 kW, usually domestic socket types",
            "IsFastChargeCapable": false,
            "ID": 1,
            "Title": "Level 1 : Low (Under 2kW)"
          }
        }
      ],
      "NumberOfPoints": 1,
      "StatusTypeID": 0,
      "DataQualityLevel": 2,
      "DateCreated": "2012-01-23T15:12:00Z",
      "SubmissionStatusTypeID": 100
    };

test('checks that the output matches all fields', () => {
  const output: Charger = {
    "id": "9215",
    "address": {
      "addressLine": "150 S Beavercreek Rd",
      "title": "150 S Beavercreek Rd",
      "town": "Oregon City",
      "state": "OR",
      "postalCode": "97045"
    },
    "connectionType": [
      {
        "typeId": 9,
        "levelId": 1
      }
    ],
    "usage": "1",
    "operatorTitle": "Shorepower",
    "website": "http://www.shorepower.com/"
  };

  // expect(sum(3, 4)).toEqual(7);
  expect(parseDetailData(input2)).toEqual(output);
 });


test('checks that operator fields blank other fields filled', () => {
  const output: Charger = {
    "id": "9215",
    "address": {
      "addressLine": "150 S Beavercreek Rd",
      "title": "150 S Beavercreek Rd",
      "town": "Oregon City",
      "state": "OR",
      "postalCode": "97045"
    },
    "connectionType": [
      {
        "typeId": 9,
        "levelId": 1
      }
    ],
    "usage": "1",
  };

  // expect(sum(3, 4)).toEqual(7);
  const charger: Charger = parseDetailData(input1);
  expect(charger).toEqual(output);
  expect(charger.operatorTitle).toBeUndefined;
  expect(charger.website).toBeUndefined;
 });


