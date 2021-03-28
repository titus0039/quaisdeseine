"use strict";

// ICONS  *****************
const greenIcon = L.icon({
	iconUrl: 'statics/img/marker-icon-green.png',
	shadowUrl: 'statics/img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

const redIcon = L.icon({
	iconUrl: 'statics/img/marker-icon-red.png',
	shadowUrl: 'statics/img/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

const goldIcon = L.icon({
	iconUrl: 'statics/img/marker-icon-gold.png',
	shadowUrl: 'statics/img/marker-shadow.png',
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
		txt: '<b>Départ :</b> le quai des Orfèvres.',
		position: 'first'
	},
	1: {
		lat: 48.856092,
		lon: 2.341933, 
		img: '20210320_111455',
		txt: 'Sur le <b>quai des Orfèvres</b> en allant vers le <b>Pont Neuf</b>.',
		position: 'any'
	},
	2: {
		lat: 48.8571632408678,
		lon: 2.340976326452218, 
		img: '20210320_111943',
		txt: '<b>La statue équestre d\'Henri IV</b>.',
		position: 'any'
	},
	3: {
		lat: 48.857646,
		lon: 2.339616,
		img: '20210320_112311',
		txt: 'La pointe de l\'<b>Île de la Cité</b> : le <b>square du Vert Galant</b>.',
		position: 'any'
	},
	4: {
		lat: 48.85946,
		lon: 2.330083,
		img: '20210320_114355',
		txt: 'Le <b>Pont Royal</b> et le <b>Pavillon de Flore</b>.',
		position: 'any'
	},
	5: {
		lat: 48.85965,
		lon: 2.329311,
		img: '20210320_114531',
		txt: '<b>Échelle hydrométrique</b> et la date de la <b>grande crue de la Seine de 1740</b> gravée dans la pierre.',
		position: 'any'
	},
	6: {
		lat: 48.86069,
		lon: 2.32658,
		img: '20210320_115104',
		txt: 'En descandant sur les <b>Berges de Seine</b>.',
		position: 'any'
	},
	7: {
		lat: 48.862038,
		lon: 2.321817,
		img: '20210320_115105',
		txt: '<b>Échelle hydrométrique</b> (mesurée en mètres NGF).',
		position: 'any'
	},
	8: {
		lat: 48.863214,
		lon: 2.315213,
		img: '20210320_122919',
		txt: '<b>Arrivée :</b> le <b>Pont Alexandre III</b> et le <b>Grand Palais</b> en arrière plan.',
		position: 'last'
	},
	9: {
		lat: 48.864361,
		lon: 2.314194,
		img: '20210320_125000',
		txt: 'Un repère du niveau de la <b>crue historique de 1910</b>.',
		position: 'any'
	}

};

var ppriShp, aziPhecShp, trackLinesShp;
var overlayMaps = L.layerGroup();

// loadTheMap *****************
const loadTheMap = () => {
	var mymap = new L.map('mapid', {
		layers: [overlayMaps]
	}).setView([48.85660964130063, 2.3524134975939015], 14);

	const geoserviceKey = 'choisirgeoportail';
	const geoserviceLayer = 'GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2';
	const geoserviceFormat = 'image/png';
	L.tileLayer(
		'https://wxs.ign.fr/'+geoserviceKey+'/geoportail/wmts?service=WMTS&request=GetTile&version=1.0.0&tilematrixset=PM&tilematrix={z}&tilecol={x}&tilerow={y}&layer='+geoserviceLayer+'&format='+geoserviceFormat+'&style=normal',
		{
		  minZoom: 0,
		  maxZoom: 18,
		  attribution: "IGN-F/Géoportail | <a href='https://geoservices.ign.fr/documentation/services-acces.html#obtention-dune-clef-dacc%C3%A8s-aux-services-web' target='_blank'>Conditions</a> | <span><em>© 2021 GOUEDARD Michel - BOYER Thierry - LPRO MPGE ENSG/PARIS I</em></span>"
		}
	).addTo(mymap);



	L.control.scale('metric').addTo(mymap);

	//loadLegend(mymap);
	loadPluPpriShp(mymap);

};

// loadPluPpriShp *****************
const loadPluPpriShp = (mymap) => {
	ppriShp = new L.Shapefile('statics/shp/plu-secteurs-de-risques-delimites-par-le-ppri.zip', {
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
		ppriShp.addTo(overlayMaps);
		loadAziPhecShp(mymap);
	});
};

// aziPhecShp *****************
const loadAziPhecShp = (mymap) => {
	aziPhecShp = new L.Shapefile('statics/shp/AZI-PHEC.zip', {
		onEachFeature: function(feature, layer) {
			//console.log(feature, feature.properties, layer);
		}
	});
	aziPhecShp.addTo(mymap);
	aziPhecShp.once("data:loaded", function() {
		console.log("finished loaded aziPhecShp");
		aziPhecShp.addTo(overlayMaps);
		loadTrackLinesShp(mymap);
	});
};


// trackLinesShp *****************
const loadTrackLinesShp = (mymap) => {
	trackLinesShp = new L.Shapefile('statics/shp/track_lines_new.zip', {
		color: '#FFD326',
		fillColor: '#FFD326',
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
				  });
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
		trackLinesShp.addTo(overlayMaps);
		loadControlLayers(mymap);

	});
};

// loadLegend *****************
const loadLegend = (mymap) => {

	function getColor(d) {
        return d === 'legend1'  ? "#FFD326" :
               d === 'legend2'  ? "#3388FF" :
               d === 'legend3' ? "#00eeff" :
               "#fff";
    }

	var legend = L.control({position: 'topright'});
		legend.onAdd = function (mymap) {

		var div = L.DomUtil.create('div', 'info legend'),
		labels = ['<strong>Légende</strong>'],
		categories = ['Itinéraire de la sortie "Quais de Seine" du 08/03/2021.', 'Plus hautes eaux connues (PHEC) de l\'atlas des zones inondées (AZI).', 'Secteurs de risques du PPRI mentionnés dans le PLU de Paris<br/>et dans les PSMV du Marais et du 7ème arrondissement.'],
		categoriesColors = ['legend1','legend2','legend3'];

		for (var i = 0; i < categories.length; i++) {
			div.innerHTML += 
			labels.push(
				'<i style="background:' + getColor(categoriesColors[i]) + '"></i> ' + (categories[i] ? categories[i] : '+')
			);
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	//legend.addTo(mymap);
};

// loadControlLayers *****************
const loadControlLayers = (mymap) => {

	let buacheUrl = 'statics/img/Buache.jpg',
		buacheBounds = [[48.877132, 2.307215], [48.834421, 2.382832]];
	let buacheOverlay = L.imageOverlay(buacheUrl, buacheBounds);
	buacheOverlay.addTo(mymap);

	buacheOverlay.addTo(overlayMaps);
	console.log("finished loaded buacheOverlay");
	  var overlay  = {
		'ppri': ppriShp,
		'aziPhec': aziPhecShp,
		'trackLines': trackLinesShp,
		'buache': buacheOverlay
	  };
	/*
	  var overlay = {
		'overlayMaps': overlayMaps
	  };
	*/
	  // https://leafletjs.com/reference.html#control-layers

		console.log(overlay);

	  L.control.layers(overlay).addTo(mymap);
};

window.onload = loadTheMap();
