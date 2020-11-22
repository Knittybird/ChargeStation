import {Loader} from "@googlemaps/js-api-loader";

    /* Note: This example requires that you consent to location sharing when
    * prompted by your browser. If you see the error "Geolocation permission
    * denied.", it means you probably did not give permission for the browser * to locate you. */
    /* TODO: Step 2, Geolocate your user
    * Replace the code from here to the END TODO comment with this code
    * from codelab instructions. */
    let pos : any;
    let map : any;
    let bounds : any;
    let infoWindow : any;
    let currentInfoWindow : any;
    let service : any;
    let infoPane : any;

    const loader = new Loader({
        apiKey: process.env.MAP_KEY,
        version: "weekly",
    });

    loader.load().then(() => {
    function initMap() {

        map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
          });
        };

        function handleLocationError(browserHasGeolocation : boolean, infoWindow : any) : any {
            // Set default location to Sydney, Australia
            pos = {lat: -33.856, lng: 151.215};
            map = new google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 15
            });
    

    // Initialize variables
        bounds = new google.maps.LatLngBounds();
        infoWindow = new google.maps.InfoWindow;
        currentInfoWindow = infoWindow;
    
    // Try HTML5 geolocation
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
    pos = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
    };
    map = new google.maps.Map(document.getElementById('map'), {
    center: pos,
    zoom: 15
    });
    bounds.extend(pos);
    infoWindow.setPosition(pos);
    infoWindow.setContent('Location found.');
    infoWindow.open(map);
    map.setCenter(pos);
    }, () => {
    // Browser supports geolocation, but user has denied permission
    handleLocationError(true, infoWindow);
    });
    } else {
    // Browser doesn't support geolocation
    handleLocationError(false, infoWindow);
    }
    
    // Display an InfoWindow at the map center
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
    'Geolocation permissions denied. Using default location.' :
    'Error: Your browser doesn\\t support geolocation.');
    infoWindow.open(map);
    currentInfoWindow = infoWindow;
    
    }

