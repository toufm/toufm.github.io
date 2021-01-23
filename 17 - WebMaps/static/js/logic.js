// Create the base map
var baseMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});
// Add tile layer for the background of map
var lightmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(baseMap);

// Store API query variables
var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// var mag = "$where=created_date between'2018-01-01T00:00:00' and '2019-01-01T00:00:00'";
// var depth = "&complaint_type=Rodent";
// var loc = "&$limit=1000";
// Assemble API query URL
// var url = baseURL + mag + depth + loc;
// Grab data with d3
d3.json(baseURL, function(response) {
    // Create a new marker cluster group
    console.log(response);
      // Loop through data
    function getColors(d) {
        if (d < 1){
            return "#800026"
        }
        else if (d < 2) {
            return "#BD0026"
        }
        else if (d < 3) {
            return "#E31A1C"
        }
        else if (d <4){
            return "#FC4E2A"
        }
        else if (d<5){
            return "#FD8D3C"
        }
        else {
            return "#FEB24C"
        }
    }
   
        // Loop through data
        function getRadius(d) {
            if (d < 1){
                return "#800026"
            }
            else if (d < 2) {
                return "BD0026"
            }
            else if (d < 3) {
                return "#E31A1C"
            }
            else if (d<4){
                return "#FC4E2A"
            }
            else if (d<5){
                return "#FD8D3C"
            }
            else {
                return "#FEB24C"
            }
        }

// Function to Determine Size of Marker Based on the Magnitude of the Earthquake
function markerSize(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 3;
}
// Create a function to adjust marker size depending on mag values
function getRadius(mag) {
    return mag * 5
}
        
    L.geoJSON(response, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                "Magnitude : " 
                + feature.properties.mag
                +"<br>"
                + feature.properties.place
                +"<br>"
                + feature.geometry.coordinates[2]
            )
        },
        
        style: function(feature){
            return{
                "color":  "white",
                "weight" : 0.2,
                "opacity":  1,
                //"dashArray":0.75,
                "fillColor" : getColors(feature.geometry.coordinates[2]),
                "Radius": getRadius(feature.properties.mag)

        
        }
        }
        

    }).addTo(baseMap);
})      