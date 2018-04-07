// Store our API endpoint inside queryUrl

var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// var queryUrl = "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=" +
//   "2014-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  console.log(data);
  console.log(data['features'][0]['geometry']['coordinates'][0]);
  console.log(data['features'][0]['properties']['mag']);
  console.log(data.features.length);


  // Once we get a response, send the data.features object to the createFeatures function
  // createFeatures(data.features);
});


// var mapBox = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
//   "access_token=pk.eyJ1Ijoia2pnMzEwIiwiYSI6ImNpdGRjbWhxdjAwNG0yb3A5b21jOXluZTUifQ." +
//   "T6YbdDixkOBWH_k9GbS8JQ";

  var mapBox = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?" +
  "access_token=pk.eyJ1IjoicHBvb2ppdGEiLCJhIjoiY2pldm9zYzJ6MHpjbjJxczhsbjV2bGEzNyJ9.RtXz3L5LRrUhuukulwFLNA";





var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 4.5
});

L.tileLayer(mapBox).addTo(myMap);

function getValue(x) {
	return (x >=0 && x< 1) ? "pink" :
         (x >=1 && x< 2) ? "orange" :
         (x >=2 && x< 3)? "yellow" :
         (x >=3 && x< 4) ? "green" :
         (x >=4 && x< 5) ? "purple" :
         x >= 5 ? "red" :
         "#FFEDA0";
}

// var mag=4.5

// console.log(getValue(mag))

// L.circle([50.5, 30.5], {radius: 200}).addTo(myMap);
d3.json(queryUrl, function(data) {
  console.log(data.features.length);
  for( var i=0; i < data.features.length; i++){
    // ("L.circle(" + data['features'][i]['geometry']['coordinates'][0] + ", " + data['features'][i]['geometry']['coordinates'][1] + ")");
    // console.log("Radius is " + data['features'][i]['properties']['mag'])

    L.circle([data['features'][i]['geometry']['coordinates'][1],data['features'][i]['geometry']['coordinates'][0]],{
      fillOpacity: 0.75,
      color: "black",
      weight:0.3,
      fillColor: getValue(data['features'][i]['properties']['mag']),
      radius: data['features'][i]['properties']['mag']*10000
    })
    // .addTo(myMap)
    .bindPopup("<h1>" + data['features'][i]['properties']['place'] + "</h1> <hr> <h3>Magnitude: " + data['features'][i]['properties']['mag']+ "</h3>").addTo(myMap);
  }
});

var legend = L.control({position: 'bottomright'});  
    legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0,1,2,3,4,5],
        labels = ['<strong> EARTHQUAKE DATA</strong>'],
        from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades [i];
        to = grades[i+1];

    labels.push(
        '<li style="background-color: ' + getValue(from) + '"></li>' + "  "+
        from + (to ? '&ndash;' + to : '+'));
        }
        div.innerHTML = labels.join('<br>');
        return div;


        };

        legend.addTo(myMap);


// var legend = L.control({position: 'bottomright'});

// legend.onAdd = function (myMap) {

//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = [1,2,3,4,5],
//         labels = [];

//     // loop through our density intervals and generate a label with a colored square for each interval
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + getValue(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }

//     return div;
// };

// legend.addTo(myMap);