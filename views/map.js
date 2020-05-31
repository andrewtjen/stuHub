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

map.on('load', function(){
  // MazeMap ready

  var lngLat = map.getCenter();

  var marker = new Mazemap.MazeMarker( {
      color: "MazeMapOrange",
      size: 36,
      glyph: '🖨'
  } ).setLngLat( lngLat ).addTo(map);

});



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
    document.getElementById("validationLocation").value =Mazemap.Util.getPoiLngLat(e.item);
  });

