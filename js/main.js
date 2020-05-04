var mymap = L.map('map', {
    center: [44.96, -103.76],
    zoom: 3,
    maxZoom: 20,
    minZoom: 2,
    detectRetina: true});


L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png').addTo(mymap);


var airports = null;
airports= L.geoJson.ajax("assets/airports.geojson",{
  onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.AIRPT_NAME + '<br>' +
                            feature.properties.CITY);
        },
        pointToLayer: function (feature, latlng) {
            var id = 0;
            if (feature.properties.CNTL_TWR == "Y") { id = 0; }
            else { id = 1;} // "N"
            return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-plane marker-color-' + (id + 1).toString() })});
        },

        attribution: 'Airport Data &copy; USGS  | States of the USA &copy; Mike Bostock of D3 | Base Map &copy; StadiaMaps Leaflet | Created by Matthew Jackson'
    }).addTo(mymap);


var colors = chroma.scale('Set1').mode('lch').colors(9);

for (i = 0; i < 9; i++) {
    $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}



var usstates = null;
usstates = L.geoJson.ajax("assets/us-states.geojson", {
        style: style
    }
).addTo(mymap);

colors = chroma.scale('YlOrBr').colors(6);

function setColor(count) {
    var id = 0;
    if (count > 40) { id = 5; }
    else if (count > 30 && count <= 40) { id = 4; }
    else if (count > 20 && count <= 30) { id = 3; }
    else if (count > 10 && count <= 20) { id = 2; }
    else if (count > 0 &&  count <= 10) { id = 1; }
    else  { id = 0; }
    return colors[id];
  }

  function style(feature) {
      return {
          fillColor: setColor(feature.properties.count),
          fillOpacity: 0.4,
          weight: 2,
          opacity: 1,
          color: 'black',
          dashArray: '2'
      };
  }




var legend = L.control({position: 'topright'});

legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<b>Airports in US States</b><br />';
    div.innerHTML += '<hr><b><u># Airports per State</u><b><br />';
    div.innerHTML += '<i style="background: ' + colors[5] + '; opacity: 0.5"></i><p>41+</p>';
    div.innerHTML += '<i style="background: ' + colors[4] + '; opacity: 0.5"></i><p>31-40</p>';
    div.innerHTML += '<i style="background: ' + colors[3] + '; opacity: 0.5"></i><p>21-30</p>';
    div.innerHTML += '<i style="background: ' + colors[2] + '; opacity: 0.5"></i><p>11-20</p>';
    div.innerHTML += '<i style="background: ' + colors[1] + '; opacity: 0.5"></i><p> 1-10</p>';
    div.innerHTML += '<i style="background: ' + colors[0] + '; opacity: 0.5"></i><p>0</p>';
    div.innerHTML += '<hr><b><u>Control Tower Indicator</u><b><br />';
    div.innerHTML += '<i class="fa fa-plane marker-color-1"></i><p> Airport with Control Tower</p>';
    div.innerHTML += '<i class="fa fa-plane marker-color-2"></i><p> Airport with no Control Tower</p>';

    return div;
};

legend.addTo(mymap);


L.control.scale({position: 'bottomright'}).addTo(mymap);
