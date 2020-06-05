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



var mySearch = new Mazemap.Search.SearchController({
  campusid: 200,

  rows: 10,

  withpois: true,
  withbuilding: true,
  withtype: false,
  withcampus: false,

  resultsFormat: 'geojson'
});

var mySearchInput = new Mazemap.Search.SearchInput({
  container: document.getElementById('search-input-container'),
  input: document.getElementById('searchInput'),
  suggestions: document.getElementById('suggestions'),
  searchController: mySearch
}).on('itemclick',function(e){
  console.log("search Successful! parsing now");

  var myString = Mazemap.Util.getPoiLngLat(e.item);
  var myRegexp = /.*LngLat[(](-?\d*\.\d*), (-?\d*\.\d*)[)]/g;
  var match = myRegexp.exec(myString);
  var lng = match[1]; 
  var lat = match[2];

  document.getElementById("locLng").value =lng;
  document.getElementById("locLat").value =lat;
  
  console.log('parsing completed!');
});

var mySearchInput = new Mazemap.Search.SearchInput({
  container: document.getElementById('search-input-container_edit'),
  input: document.getElementById('searchInput_edit'),
  suggestions: document.getElementById('suggestions_edit'),
  searchController: mySearch
}).on('itemclick', function(e){
  var myString = Mazemap.Util.getPoiLngLat(e.item);
  var myRegexp = /.*LngLat[(](-?\d*\.\d*), (-?\d*\.\d*)[)]/g;
  var match = myRegexp.exec(myString);
  var lng = match[1]; 
  var lat = match[2];

  document.getElementById("locLng_edit").value =lng;
  document.getElementById("locLat_edit").value =lat;
});


function addMarker() {

  var lng = document.querySelectorAll('#lng');
  var lat = document.querySelectorAll('#lat');
  var category = document.querySelectorAll('#category');
  console.log(lng.length);
  
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

      console.log(category[i].outerText);
      var marker = new Mazemap.MazeMarker( {
        color: 'MazePurple',
        size: 40,
        innerCircle: false,
        glyphSize: 18,
        glyph: glyph

      } ).setLngLat(  lnglat ).addTo(map);
  }
}

