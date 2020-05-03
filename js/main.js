// 1. Create a map object.
var mymap = L.map('map', {
    center: [44.96, -103.76],
    zoom: 3.5,
    maxZoom: 10,
    minZoom: 2,
    detectRetina: true});

// 2. Add a base map.
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png').addTo(mymap);
