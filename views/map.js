var mapOptions = {
  // The DOM element ID for the map
  container: 'map',

  // The ID of the campus to show
  campuses: 200,

  // Initial position of map
  center: {lat:-37.798296, lng: 144.960977},

  // Initial zoom of map
  zoom: 15.5,

  scrollZoom: true,
  doubleClickZoom: true,
  touchZoomRotate: true,
  zLevelControl: true,
  // // Initial floor z level of map
  // zLevel: 3,

  container: 'mazemap-container'

}
var map = new Mazemap.Map(mapOptions);
map.addControl(new Mazemap.mapboxgl.NavigationControl());

// map.on('load', function(){
//   // MazeMap ready

//   // var lngLat = map.getCenter();
//   // document.getElementById("validationLocation").value =lngLat;
//   var marker = new Mazemap.MazeMarker( {
//       color: "MazeMapOrange",
//       size: 36,
//       glyph: '🖨'
//   } ).setLngLat( "LngLat(144.95928978063154, -37.797538860015194)" ).addTo(map);

// });



var mySearch = new Mazemap.Search.SearchController({
  campusid: 200,

  rows: 10,

  withpois: true,
  withbuilding: false,
  withtype: false,
  withcampus: false,

  resultsFormat: 'geojson'
});

var mySearchInput = new Mazemap.Search.SearchInput({
  container: document.getElementById('search-input-container'),
  input: document.getElementById('searchInput'),
  suggestions: document.getElementById('suggestions'),
  searchController: mySearch
  }).on('itemclick', function(e){

    var myString = Mazemap.Util.getPoiLngLat(e.item);
    var myRegexp = /.*LngLat[(](-?\d*\.\d*), (-?\d*\.\d*)[)]/g;
    var match = myRegexp.exec(myString);
    var lng = match[1]; 
    var lat = match[2];

    document.getElementById("locLng").value =lng;
    document.getElementById("locLat").value =lat;
    
  });

