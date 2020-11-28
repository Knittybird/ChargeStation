// This file is for rendering result pages
// to work on styling

import path = require("path");
import {fetchCharge} from "../public/details"
require('dotenv').config();

// set up url for opencharge
const base : string = 'https://api.openchargemap.io/v3/poi/?'; 
const chargeKey : string = process.env.OPENCHARGE_KEY
const url : string = `${base}key=${chargeKey}`; //+ chargeKey;

// set up express and set port
const express : any = require('express');
const app : any = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port : number = parseInt(process.env.PORT, 10) || 5000;

// using pug temlates
app.set('view engine', 'pug');

// public folder contains static file(s) that will be served
app.use(express.static('public'));

// canned test data. had problems importing it
const chargers = [
  {
    id: "29296",
    address: {
      addressLine: "222 SW Harrison Street",
      title: "Harrison Tower",
      town: "Portland",
      state: "OR",
      postalCode: "97201"
    },
    pos: {
      lat: "45.5097989",
      lng: "-122.6794873"
    }
  },
  {
    id: "144407",
    address: {
      addressLine: "100 SW Market St",
      title: "Park Square",
      town: "Portland",
      state: "OR",
      postalCode: "97201"
    },
    pos: {
      lat: "45.510792",
      lng: "-122.67764"
    }
  },
  {
    id: "97419",
    address: {
      addressLine: "1510 SW Harbor Wy",
      title: "Kimpton Riverplace Hotel",
      town: "Portland",
      state: "OR",
      postalCode: "97201"
    },
    pos: {
      lat: "45.511486",
      lng: "-122.674101"
    }
  },
  {
    id: "144411",
    address: {
      addressLine: "200 SW Market St, Suite 1720",
      title: "200 SW Market Building",
      town: "Portland",
      state: "OR",
      postalCode: "97201"
    },
    pos: {
      lat: "45.511592",
      lng: "-122.6786039" 
    },
  },
  {
    id: "3069",
    address: {
      addressLine: "1945 SE Water Ave",
      title: "Oregon Museum of Science and Industry (OMSI)",
      town: "Portland",
      state: "OR",
      postalCode: "97214"
    },
    pos: {
      lat: "45.508501",
      lng: "-122.665932"
    }
  },
  {
    id: "79829",
    address: {
      addressLine: "1401 Southwest Naito Parkway",
      title: "Portland Marriott Downtown Waterfront",
      town: "Portland",
      state: "OR",
      postalCode: "97201"
    },
    pos: {
      lat: "45.5123866",
      lng: "-122.6756475"
    }
  },
  {
    id: "8473",
    address: {
      addressLine: "2145 SE Water Avenue",
      title: "2145 SE Water Avenue",
      town: "Portland",
      state: "OR",
      postalCode: "97214"
    },
    pos: {
      lat: "45.50932",
      lng: "-122.66639"
    }
  }
]


// render result-list page
app.get('/', (req, res) => {

    res.render('results_list', { 
      chargers: chargers
    });
});


// render detail page
app.get('/detail/:id', (req, res) =>{
  console.log(req.params);
  fetchCharge(url, req.params.id)
  res.render('detail', {
      Title : 'Test result',
      id: req.params.id
  });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});