import path = require("path");

const express : any = require('express');
const app : any = express();
const port : number = parseInt(process.env.PORT, 10) || 5000;
const request : any = require('request-promise');
const base : string = 'https://api.openchargemap.io/v3/poi/?'; 
const chargeKey : string = process.env.OPENCHARGE_KEY
const mapKey : string = process.env.MAP_KEY
const googleMapsClient = require('@google/maps').createClient({
    key:"AIzaSyBcUkvaCCtPiuJKP5UZfpzJsO90MfD7hRE"
});

const url : string = `${base}key=8bc4f8db-272f-458b-82f7-c052a5c53c9a`; //+ chargeKey;
//const temp : string = `https://api.openchargemap.io/v3/poi/?key=${chargeKey}&output=json&countrycode=US&maxresults=10`;
const temp : string = "https://api.openchargemap.io/v3/poi/?key=8bc4f8db-272f-458b-82f7-c052a5c53c9a&verbose=false&output=json&includecomments=true&maxresults=10&compact=true&latitude=45.5051064&longitude=-122.6750261&distance=10&distanceunit=Mile"//https://api.openchargemap.io/v3/poi/?key=8bc4f8db-272f-458b-82f7-c052a5c53c9a&output=json&maxresults=10&longitude=45.5051064&latitude=-122.6750261&countrycode=US&distance=1";
const gurl : string = `https://maps.googleapis.com/maps/api/js?key=${mapKey}&libraries=places&callback=initMap`

app.set('views', __dirname + '/../views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'maps.js')));

// public folder contains static file(s) that will be served
app.use(express.static('public'))

function options(options : string []) : string {

    let output : string =""
    let o : string = ""
    for(o in options)
        if (output == "")
            output = options[o];
        else
            output += "&" + options[o];

    return output;

}

let results : Object[] = [];

//Figure out charger info/route info
request(temp, function (error : number, response : any, body : any) : Object{
    if (!error && response.statusCode == 200) {
        let json_body : Object = JSON.parse(body);
        //console.log(json_body)

        return json_body;
    }
});

let gmaps = request(gurl, function (error : number, response : any, body : any) : void{
    if (!error && response.statusCode == 200) {
        return body;
    }
});

let pos : object;
let map : any;
function initMap() {
      // Set the default location and initialize all variables
      pos = { lat: -33.857, lng: 151.213 };
      map = new gmaps.google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
    });
}

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

    console.log(process.env.OPENCHARGE_KEY);
    let output : string = "output=json";
    let distance :string = 'distance=' + req.body.radius;
    let country : string = 'countrycode=US';
    let distance_u : string = 'distanceunit=Miles';
    let compact : string = "compact=true";
    let verbose : string = "verbose=false";
    let incl_comm : string = "includecomments=true";
    let max_results : string = "maxresults=10"

    //let out_url : string = url + output;
    let out_url : string = googleMapsClient.geocode({
    address: req.body.location
    }, function(err : any, response : any) : void {
    if (!err) {
        let lat : string = "latitude="+response.json.results[0].geometry.location['lat'];
        let lng : string = "longitude="+response.json.results[0].geometry.location['lng'];
        let ret = options([url,verbose, output, incl_comm, max_results, compact, lat, lng,distance, distance_u]);

        console.log(ret);
        //if (ret === "https://api.openchargemap.io/v3/poi/?key=8bc4f8db-272f-458b-82f7-c052a5c53c9a&verbose=false&output=json&includecomments=true&maxresults=10&compact=true&latitude=45.5051064&longitude=-122.6750261&distance=10&distanceunit=Miles")

        request(ret, function (error : number, response : any, body : any) : void{
            if (!error && response.statusCode == 200) {
                let json_body : Object = JSON.parse(body);
                console.log(json_body)
        
                //return json_body;
            }
        });
    }
    });

    res.render('directions_results', {
        Title : 'Results'
    });
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
   
// const express = require('express');
// const path = require('path');

// const app = express();
// const port = process.env.PORT || 5000;



// // specify the URL route and the file structure route
// app.use('/images', express.static('images'));

// // send a specific file to be served to the client
// app.get('/about', (req, res) => {
// res.sendFile(path.join(__dirname + '/public/about.html'));
// });

// app.listen(port, () => {
// console.log(`Server running at http://localhost:${port}`);
// }); 