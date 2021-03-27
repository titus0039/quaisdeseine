
// ICONS  *****************
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

const goldIcon = L.icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png',
	shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

// MARKER Photos  *****************
const mapMarkers = {
	0: {
		lat: 48.85381965,
		lon: 2.34460205, 
		img: '20210320_110716',
		txt: '<b>Départ :</b> Quai des Orfèvres',
		position: 'first'
	},
	1: {
		lat: 48.856092,
		lon: 2.341933, 
		img: '20210320_111455',
		txt: 'Sur le quai des Orfèvres en allant vers le Pont Neuf',
		position: 'any'
	},
	2: {
		lat: 48.8571632408678,
		lon: 2.340976326452218, 
		img: '20210320_111943',
		txt: 'La statue équestre d\'Henri IV',
		position: 'any'
	},
	3: {
		lat: 48.857646,
		lon: 2.339616,
		img: '20210320_112311',
		txt: 'le square du Vert Galant',
		position: 'any'
	},
	4: {
		lat: 48.85946,
		lon: 2.330083,
		img: '20210320_114355',
		txt: 'Vue sur le Pont Royal et le Pavillon de Flore',
		position: 'any'
	},
	5: {
		lat: 48.85965,
		lon: 2.329311,
		img: '20210320_114531',
		txt: 'Échelle hydrométrique gravée dans la pierre',
		position: 'any'
	},
	6: {
		lat: 48.86069,
		lon: 2.32658,
		img: '20210320_115104',
		txt: 'En descandant sur les Berges de Seine',
		position: 'any'
	},
	7: {
		lat: 48.862038,
		lon: 2.321817,
		img: '20210320_115105',
		txt: 'Échelle hydrométrique (mesurée en mètres NGF)',
		position: 'any'
	},
	8: {
		lat: 48.863214,
		lon: 2.315213,
		img: '20210320_122919',
		txt: 'Le Pont Alexandre III',
		position: 'last'
	},
	9: {
		lat: 48.864361,
		lon: 2.314194,
		img: '20210320_125000',
		txt: 'Un repère de la crue de 1910',
		position: 'any'
	}

};

// loadTheMap *****************
loadTheMap = () => {
	var mymap = new L.map('mapid').setView([48.85660964130063, 2.3524134975939015], 14);
	L.control.scale('metric').addTo(mymap);

	const geoserviceKey = 'choisirgeoportail';
	const geoserviceLayer = 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2';
	const geoserviceFormat = 'image/png';
	L.tileLayer(
	'https://wxs.ign.fr/'+geoserviceKey+'/geoportail/wmts?service=WMTS&request=GetTile&version=1.0.0&tilematrixset=PM&tilematrix={z}&tilecol={x}&tilerow={y}&layer='+geoserviceLayer+'&format='+geoserviceFormat+'&style=normal',
	{
	  minZoom: 0,
	  maxZoom: 18,
	  attribution: "IGN-F/Géoportail | <a href='https://geoservices.ign.fr/documentation/services-acces.html#obtention-dune-clef-dacc%C3%A8s-aux-services-web' target='_blank'>Conditions</a> | <span><em>© 2021 Michel Gouédard, Thierry Boyer - L3Pro MPGE</em></span>"
	}
	).addTo(mymap);
	
/*
	var popup = L.popup();
	function onMapClick(e) {
	  popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(mymap);
	}
	mymap.on('click', onMapClick);
*/
	loadPluPpriShp(mymap);
};

// aziPhecShp *****************
loadAziPhecShp = (mymap) => {
	var aziPhecShp = new L.Shapefile('statics/shp/AZI-PHEC.zip', {
		onEachFeature: function(feature, layer) {
			//console.log(feature, feature.properties, layer);
		}
	});
	aziPhecShp.addTo(mymap);
	aziPhecShp.once("data:loaded", function() {
		console.log("finished loaded aziPhecShp");
		loadTrackLinesShp(mymap);
	});
};

// trackLinesShp *****************
loadTrackLinesShp = (mymap) => {
	var trackLinesShp = new L.Shapefile('statics/shp/track_lines_new.zip', {
		color: '#FFD326',
		fillColor: '##FFD326',
		fillOpacity: 1,
		onEachFeature: function(feature, layer) {
			//console.log(feature, feature.properties, layer);
		}
	});
	trackLinesShp.addTo(mymap);
	trackLinesShp.once("data:loaded", function() {
		console.log("finished loaded trackLinesShp");
		//console.log('mapMarkers', mapMarkers);

		for (var prop in mapMarkers) {
			let mkr = mapMarkers[prop];
			//console.log('mkr', mkr);
			if (mkr.position === 'first') {
				L.marker([mkr.lat, mkr.lon])
				  .addTo(mymap)
				  .setIcon(greenIcon)
				  .bindPopup('<img src="statics/photos/'+mkr.img+'.jpg" width="" height="" class="" alt="" /><br />'+mkr.txt+'', {
					maxWidth: 650
				  });//.openPopup();
			} else if (mkr.position === 'last') {
				L.marker([mkr.lat, mkr.lon])
				  .addTo(mymap)
				  .setIcon(redIcon)
				  .bindPopup('<img src="statics/photos/'+mkr.img+'.jpg" width="" height="" class="" alt="" /><br />'+mkr.txt+'', {
					maxWidth: 650
				  });
			} else {
				L.marker([mkr.lat, mkr.lon])
				  .addTo(mymap)
				  .setIcon(goldIcon)
				  .bindPopup('<img src="statics/photos/'+mkr.img+'.jpg" width="" height="" class="" alt="" /><br />'+mkr.txt+'', {
					maxWidth: 650
				  });
			}
		}

	});
};

loadPluPpriShp = (mymap) => {
	var ppriShp = new L.Shapefile('statics/shp/plu-secteurs-de-risques-delimites-par-le-ppri.zip', {
		color: '#00eeff',
		fillColor: '##00eeff',
		fillOpacity: 0.2,
		onEachFeature: function(feature, layer) {
			//console.log('plu-secteurs-de-risques-delimites-par-le-ppri', feature, feature.properties, layer);
		}
	});
	ppriShp.addTo(mymap);
	ppriShp.once("data:loaded", function() {
		console.log("finished loaded loadPluPpriShp");
		loadAziPhecShp(mymap);
	});

};

window.onload = loadTheMap();

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



