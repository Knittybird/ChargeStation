const express : any = require('express');
const app : any = express();
const port : number = parseInt(process.env.PORT, 10) || 5000;
const request : any = require('request-promise');
const base : string = 'https://api.openchargemap.io/v3/?'; //'https://api.openchargemap.io/v3/';
const key : string = '8bc4f8db-272f-458b-82f7-c052a5c53c9a'
const url : string = base + 'key=' + key;
const temp : string = "https://api.openchargemap.io/v3/poi/?key=8bc4f8db-272f-458b-82f7-c052a5c53c9a&output=json&countrycode=US&maxresults=10";
app.set('views', __dirname + '/../views');
app.set('view engine', 'pug');

app.use(express.json());

function options(options : string []) : string {

    let output : string =""
    let o : string = ""
    for(o in options)
        if (output == "")
            output = o;
        else
            output += o;

    return output;

}

let results : Object[] = [];

//Figure out charger info/route info
request(temp, function (error : number, response : any, body : any) : void{
    if (!error && response.statusCode == 200) {
        let json_body : Object = JSON.parse(body);
        console.log(json_body)
        /*let row : string = ''
        for(row in json_body)
            {
                results.push({'name' : json_body[row].name, 'population' : json_body[row].population});//TODO Style correctly               
            }*/

    }
});

app.get('/', (req, res) => {
    res.render('index', {
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
    res.render('search_results', {
        Title : 'Results'
    });
});

app.post('/directions_results', (req, res) => {
    res.render('directions_results', {
        Title : 'Results'
    });
});



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
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