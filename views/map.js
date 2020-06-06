
//Intiate the coordinate of the map
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

  container: 'mazemap-container'

}

var map = new Mazemap.Map(mapOptions);
map.addControl(new Mazemap.mapboxgl.NavigationControl());

//Searching giving a suggested input on the searchbar
var mySearch = new Mazemap.Search.SearchController({
  campusid: 200,

  rows: 10,

  withpois: true,
  withbuilding: true,
  withtype: false,
  withcampus: false,

  resultsFormat: 'geojson'
});

//Searching the event
var mySearchInput = new Mazemap.Search.SearchInput({
  container: document.getElementById('search-input-container'),
  input: document.getElementById('searchInput'),
  suggestions: document.getElementById('suggestions'),
  searchController: mySearch
}).on('itemclick',function(e){
  //Action after selecting the suggested location input

  //Parsing the coordinate
  var myString = Mazemap.Util.getPoiLngLat(e.item);
  var myRegexp = /.*LngLat[(](-?\d*\.\d*), (-?\d*\.\d*)[)]/g;
  var match = myRegexp.exec(myString);
  var lng = match[1]; 
  var lat = match[2];

  //Store the coordinate
  document.getElementById("locLng").value =lng;
  document.getElementById("locLat").value =lat;
  
  console.log('parsing completed!');
});

//Searcing the suggested location input
var mySearchInput = new Mazemap.Search.SearchInput({
  container: document.getElementById('search-input-container_edit'),
  input: document.getElementById('searchInput_edit'),
  suggestions: document.getElementById('suggestions_edit'),
  searchController: mySearch
}).on('itemclick', function(e){

  //parsing the coordinate 
  var myString = Mazemap.Util.getPoiLngLat(e.item);
  var myRegexp = /.*LngLat[(](-?\d*\.\d*), (-?\d*\.\d*)[)]/g;
  var match = myRegexp.exec(myString);
  var lng = match[1]; 
  var lat = match[2];

  //storing the coordinate
  document.getElementById("locLng_edit").value =lng;
  document.getElementById("locLat_edit").value =lat;
});

//Adding marker to the event
function addMarker() {

  //grabbing the coordinate 
  var lng = document.querySelectorAll('#lng');
  var lat = document.querySelectorAll('#lat');
  var category = document.querySelectorAll('#category');
  
  //add marker for every coordinate given
  for (var i=0; i < lng.length; i++){

      var lnglat = {lat: lat[i].outerText, lng: lng[i].outerText};
      if(category[i].outerText == "sports"){
          var glyph = '🏀';
      } else if(category[i].outerText == "studies"){
          var glyph = '📚';
      } else if(category[i].outerText == "leisure"){
          var glyph = '🏖️';
      } else if(category[i].outerText == "club activity"){
          var glyph = '👪';
      }

      //Set the types of the marker
      var marker = new Mazemap.MazeMarker( {
        color: 'MazePurple',
        size: 40,
        innerCircle: false,
        glyphSize: 18,
        glyph: glyph

      } ).setLngLat(  lnglat ).addTo(map);
  }
}

