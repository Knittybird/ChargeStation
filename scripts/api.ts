import path = require("path");
import {fetchCharge} from "../public/details"
require('dotenv').config();

const express : any = require('express');
const app : any = express();
const port : number = parseInt(process.env.PORT, 10) || 5000;
const request : any = require('request-promise');
const base : string = 'https://api.openchargemap.io/v3/poi/?'; 
const chargeKey : string = process.env.OPENCHARGE_KEY
const mapKey : string = process.env.MAP_KEY
const url : string = `${base}key=${chargeKey}`; //+ chargeKey;

// app.set('views', '/views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// public folder contains static file(s) that will be served
app.use(express.static('public'));

app.get('/', (req, res) => {

    res.render('index', {
    });
});

app.get('/gmaps', (req, res) => {

    res.render('gmaps', {
        Title : 'Home'
    });
});

app.get('/index', (req, res) => {
    res.render('index', {
        Title : 'Home'
    });
});

app.get('/directions', (req, res) => {
    res.render('directions', {
        Title : 'Directions'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        Title : 'About'
    });
});

app.get('/search', (req, res) => {

    res.render('search', {
        Title : 'Search'
    });
});

app.post('/results_list', (req, res) => {
    let output : string = "output=json";
    let distance : string= 'distance=' + req.body.radius;
    let distance_u :string = 'distanceunit=Miles';
    let compact :string = "compact=false";
    let verbose :string = "verbose=false";
    let incl_comm :string = "includecomments=true";
    let max_results:string  = "maxresults=10"
    let address : any= req.body.location
    let api = require('../public/api_link.js');
    api.addr(address, url,verbose, output, incl_comm, max_results, compact,distance, distance_u,res)
});

app.get('/detail/:id', (req, res) =>{

    fetchCharge(res, url, req.params.id);
});

app.post('/directions_results', (req, res) => {

    res.render('search_results', {
        Title : 'Results'
    });
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
