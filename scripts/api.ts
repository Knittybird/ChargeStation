import path = require("path");
require('dotenv').config();

const express : any = require('express');
const app : any = express();
const port : number = parseInt(process.env.PORT, 10) || 5000;
const request : any = require('request-promise');
const base : string = 'https://api.openchargemap.io/v3/poi/?'; 
const chargeKey : string = process.env.OPENCHARGE_KEY
const mapKey : string = process.env.MAP_KEY
const url : string = `${base}key=${chargeKey}`; //+ chargeKey;
//const temp : string = `https://api.openchargemap.io/v3/poi/?key=${chargeKey}&verbose=false&output=json&includecomments=true&maxresults=10&compact=true&latitude=45.5051064&longitude=-122.6750261&distance=10&distanceunit=Mile`//https://api.openchargemap.io/v3/poi/?key=8bc4f8db-272f-458b-82f7-c052a5c53c9a&output=json&maxresults=10&longitude=45.5051064&latitude=-122.6750261&countrycode=US&distance=1";
//const gurl : string = `https://maps.googleapis.com/maps/api/js?key=${mapKey}&libraries=places&callback=initMap`

// app.set('views', '/views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded());

// public folder contains static file(s) that will be served
app.use(express.static('public'));

app.get('/', (req, res) => {

    res.render('index', {
        Title : 'Home'
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

app.post('/search_results', (req, res) => {
    let output : string = "output=json";
    let distance : string= 'distance=' + req.body.radius;
    let distance_u :string = 'distanceunit=Miles';
    let compact :string = "compact=true";
    let verbose :string = "verbose=false";
    let incl_comm :string = "includecomments=true";
    let max_results:string  = "maxresults=10"
    let address : any= req.body.location
    let api = require('../public/api_link.js');
    api.addr(address, url,verbose, output, incl_comm, max_results, compact,distance, distance_u)
    res.render('search_results', {
        Title : 'Results'
    });
});

app.post('/directions_results', (req, res) => {

    res.render('search_results', {
        Title : 'Results'
    });
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
