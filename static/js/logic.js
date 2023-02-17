var URL1 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

d3.json(URL1).then(function (data) {
  leaflet(data.features);

});

function createMap(earthquakes) {
    var Street = L.tileLayer('https://{s}.tile.openStreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openStreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
    var Top = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openStreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    var Cycle = L.tileLayer('https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openStreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    var Base = {"Street Map": Street,"Topographic Map": Top, "Cycle Map" : Cycle };
    var Points = {"Earthquakes": earthquakes};
    var Maps = L.map("map", {
      center: [46.52, 15.25
      ],
      zoom: 5,
      layers: [Street, earthquakes],
    });
  
    L.control.layers(Base, Points, {
      collapsed: false
    }).addTo(Maps);
    return div;
  }; 

function leaflet(Points) {

  function Feature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><hr><p>Magnitude:${(feature.properties.mag)}</p><hr><p>Depth: ${(feature.geometry.coordinates[2])}</p>`);
  }
  
  var earthquakes = L.geoJSON(Points, {
    "onEachFeature": Feature, 
    style: styleInfo,
    pointToLayer : function(feature, latlon) {
      return L.circle(latlon, feature.properties.mag*35000);
  }
  });

createMap(earthquakes);
}

function styleInfo(feature){
    function Colors(depth){
        if (depth > 85) {
             return "#dd0000";
           }
         if (depth > 70) {
           return "#ff2525";
         }
         else if (depth > 55) {
           return "#ff6334";
         }
         else if (depth > 40) {
           return "#ff9734";
         }
         else if (depth > 25) {
           return "#ecdb34";
         }
         else if (depth > 15) {
           return "#aedb2d"
         }
         else if (depth > 10) {
           return "#6bdb2d"
         }
         else if (depth > 4) {
           return "#2fed90"
         }
         else {
           return "#2fcdd3";
         }
       };
  var depth = feature.geometry.coordinates[2];
  return {
    color: Colors(depth)
  };
}; 

  




