
var mymap = L.map('mapid').setView([48.85660964130063, 2.3524134975939015], 13);
L.control.scale('metric').addTo(mymap);

/* L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mymap); */

const geoserviceKey = 'choisirgeoportail';
const geoserviceLayer = 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2';
const geoserviceFormat = 'image/png';
L.tileLayer(
'https://wxs.ign.fr/'+geoserviceKey+'/geoportail/wmts?service=WMTS&request=GetTile&version=1.0.0&tilematrixset=PM&tilematrix={z}&tilecol={x}&tilerow={y}&layer='+geoserviceLayer+'&format='+geoserviceFormat+'&style=normal',
{
  minZoom: 0,
  maxZoom: 18,
  attribution: "IGN-F/Géoportail | <a href='https://geoservices.ign.fr/documentation/services-acces.html#obtention-dune-clef-dacc%C3%A8s-aux-services-web' target='_blank'>Conditions</a> | <span><em>© 2021 tboyer L3Pro MPGE</em></span>"
}
).addTo(mymap);

/*var popup = L.popup()
.setLatLng([48.85660964130063, 2.3524134975939015])
.setContent('<img src="statics/img/ENSG-logo.jpg" width="120" height="" class="" alt="" /><br /><em>ENSG</em>')
.openOn(mymap);*/

//https://unpkg.com/browse/leaflet@1.7.1/dist/images/
const greenIcon = L.icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

const redIcon = L.icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});
	  
// dep :
L.marker([48.85381965, 2.34460205])
  .addTo(mymap)
  .setIcon(greenIcon)
  .bindPopup('<img src="statics/img/quai_orf.jpg" width="120" height="" class="" alt="" /><br />Quai des Orfèvres').openPopup();

// arr :
L.marker([48.863219, 2.315202])
  .addTo(mymap)
  .setIcon(redIcon)
  .bindPopup('<img src="statics/img/pt_alex.jpg" width="120" height="" class="" alt="" /><br />Pont Alexandre III'); //.openPopup();

  

var timeoutID;

timeoutID = window.setTimeout(function() {
	var trackLinesShp = new L.Shapefile('statics/shp/track_lines_new.zip', {
		color: 'red',
		fillColor: '#f00',
		fillOpacity: 1,
		onEachFeature: function(feature, layer) {
			console.log(feature, layer);
		}
	});
	trackLinesShp.addTo(mymap);
	trackLinesShp.once("data:loaded", function() {
		console.log("finished loaded shapefile");
		window.clearTimeout(timeoutID);
	});
}, 1000);

var aziPhecShp = new L.Shapefile('statics/shp/AZI-PHEC.zip', {
	onEachFeature: function(feature, layer) {
		console.log(feature, layer);
	}
});
aziPhecShp.addTo(mymap);
aziPhecShp.once("data:loaded", function() {
	console.log("finished loaded shapefile");
});




/*

	L.circle([51.508, -0.11], 500, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(mymap).bindPopup("I am a circle.");
	
      var popup = L.popup()
        .setLatLng([48.85660964130063, 2.3524134975939015])
        .setContent('<img src="statics/img/ENSG-logo.jpg" width="120" height="" class="" alt="" />')
        .openOn(jo2024Map);

var imageUrl = 'https://legacy.lib.utexas.edu/maps/historical/newark_nj_1922.jpg',
imageBounds = [[48.885244, 2.165852], [48.772464, 2.509174]];
L.imageOverlay(imageUrl, imageBounds).addTo(jo2024Map);
        */
var popup = L.popup();
function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(mymap);
}
mymap.on('click', onMapClick);


