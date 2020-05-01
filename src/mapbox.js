import {} from 'mapbox-gl-leaflet';
import 'leaflet/dist/leaflet.css';

let map
const radius = 1000;

function onLocationFound(e) {
    let marker = L.marker(e.latlng, { draggable: true }).addTo(map).bindPopup('Mueve este marcador a tu ubicación exacta').openPopup();
    let circle = L.circle(e.latlng, radius).addTo(map)
    map.panTo(e.latlng);

    marker.on('dragstart', function (e) {
        map.removeLayer(circle);
    });

    marker.on('dragend', function (e) {
        let newPos = e.target.getLatLng();
        circle = new L.circle(newPos, { radius: radius }).addTo(map);
    });

    document.getElementById('start').style.display = 'none';
    document.getElementById('map').style.display = 'block';
}

function onLocationError() {
    document.getElementById('alert').style.display = 'block';
    document.getElementById('startButton').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
}

export function boot () {    
    map = L.map('map').setView([40.4173155, -3.7044806], 15);
    map.attributionControl.addAttribution('Github: <a target="_blank" href="https://github.com/jgmullor/kilometrodesdecasa.com">@jgmullor</a>');
    
    L.mapboxGL({
        accessToken: MAPBOX_ACCESS_TOKEN,
        style: 'mapbox://styles/mapbox/streets-v8'
    }).addTo(map);    
}

export function start () {
    map.locate();
    document.getElementById('alert').style.display = 'none';
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('spinner').style.display = 'block';
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
}