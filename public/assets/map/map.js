<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC1xDn9AttqVKQa-BdbbETlqjMnBQ-qLEw&libraries=places"></script>

let map;
let infowindow;

function initMap() {
    // will need to fill in with long/lat for location we want to display
    // const will change accordingly

    const losAngeles = {lat: -33.867, lng: 151.195};

    map = new google.maps.Map(document.getElementById('map'),
    center: losAngeles,
    zoom: 15
});

infowindow = new google.maps.InfoWindow();
const service = new google.maps.places.PlacesService(map);
service.nearbySearch({
    location: losAngeles,
    radius: 500,
    type: ['store']
}, callback);

