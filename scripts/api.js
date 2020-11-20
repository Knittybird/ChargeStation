var express = require('express');
var app = express();
var port = parseInt(process.env.PORT, 10) || 5000;
var request = require('request');
var url = 'https://restcountries.eu/rest/v2/all'; //'https://api.openchargemap.io/v3/';
app.set('views', __dirname + '/../views');
app.set('view engine', 'pug');
app.use(express.json());
app.get('/', function (req, res) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_body = JSON.parse(body);
            console.log(json_body);
            var results = [];
            var row = '';
            for (row in json_body) {
                results.push({ 'name': json_body[row].name, 'population': json_body[row].population }); //TODO Style correctly               
            }
            res.render('index', {
                data: results
            });
        }
    });
});
app.listen(port, function () {
    console.log("Server running at http://localhost:" + port);
});
/*const express : any = require('express');
const app : any = express();
const port : number  = parseInt(process.env.PORT) || 5000;
const request : any = require('request');
const url : string = 'https://restcountries.eu/rest/v2/all';

app.use(express.json());

app.get('/main', (req : any, res : any) => {
    let results : object [] = [];
    let row : string = "";
    
    request(url, function (error : number, response : any, body : string) {
    if (!error && response.statusCode == 200) {
        let json_body : any = JSON.parse(body);
        
        for(row in json_body)
            {
                results.push({'name' : json_body[row].name, 'population' : json_body[row].population});//TODO Style correctly
            }

    }
    res.render('index', {
    title: 'Main',
    heading: 'Welcome to the Main Page',
    data: results
    });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

*/ 
