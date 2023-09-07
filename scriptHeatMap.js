		// CREATE MAP OBJECT
		let startCoordinates = [51.588609, 4.774849];
		let startZoom = 15;

var map = L.map('map').setView(startCoordinates, startZoom);
    
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// GENERATE 150 MARKER LOCATIONS
var heatSpots = [];

for (var i = 0; i < 150; i++) {
var lat = 51.5 + (Math.random() - 0.5) * 0.2; // Random latitude around 51.5
var lng = -0.1 + (Math.random() - 0.5) * 0.4; // Random longitude around -0.1
var intensity = 15.5; // Random intensity between 0.5 and 1.0

heatSpots.push([lat, lng, intensity]);
}

// TAKE THE heatSpots ARRAY OF LOCATIONS AND PUT THEM ON THE MAP AS HEAT SPOTS
// L.heatLayer(heatSpots
//     , {
//         radius: 10,
//         blur: 15,
//         maxZoom: 8
//     }).addTo(map);



		// READ CSV FILE 
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'data/testData.csv');
		xhr.onload = function() {
			if (xhr.status === 200) {
				var csv = xhr.responseText;
				var data = csv.split('\n');
				var headers = data[0].split(',');
				var latIndex = headers.indexOf('Latitude');
				var lngIndex = headers.indexOf('Longitude');
                var metaTags = headers.indexOf('Metatags');
                for (var i = 1; i < data.length; i++) {
					var row = data[i].split(',');
					if (row.length >= 2) {

						var lat = parseFloat(row[latIndex]);
						var lng = parseFloat(row[lngIndex]);
						var mTags = row[metaTags];
                        heatSpots.push([lat, lng, mTags]);
                        
                        
						if (!isNaN(lat) && !isNaN(lng)) {
							// L.marker([lat, lng], {icon: icon}).addTo(map).bindPopup(
							// 	'<b>' + mTags + '</b><br>'
							// );
                            L.heatLayer(heatSpots
                                , {
                                    radius: 10,
                                    blur: 15,
                                    maxZoom: 8
                                }).addTo(map);
						}
					}
				}
			}
		};
		xhr.send();    