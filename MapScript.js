(function() {
    var map = L.map('map', {
        attributionControl: false
    });
    
    L.tileLayer('http://{s}.tile.stamen.com/{style}/{z}/{x}/{y}.png', { 
        style: 'toner-background'
    }).addTo(map);
    $.getJSON("states.min.geojson", function(data) {
        var info = L.control();
        info.update = function (props) {
        this._div.innerHTML = (props ? '<b>' + props['STATE_NAME'] + '</b>' : ' ');
    };
    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); 
        this.update();
        return this._div;
    };
    info.addTo(map);
    var geojson = L.geoJson(data, {
        style: function (feature) {
            return {
                color: '#f76262',
                weight: 2,
                fillOpacity: 0.5
            };
        },
        onEachFeature: function (feature, layer) {
            layer.on('mouseover', function(e) {
                layer.setStyle({
                    weight: 4,
                    fillOpacity: 0.8
                });
                info.update(layer.feature.properties);
            })
            .on('mouseout', function(e) {
                geojson.resetStyle(layer);
                info.update();
            });
        }
    });
    geojson.addTo(map);
    var boundsLayer = geojson.getBounds();
    map.fitBounds(boundsLayer);
    map.options.maxBounds = boundsLayer;
    map.options.minZoom = map.getZoom();
    
    // Maker pin
    var offerorPoints = [-35.012330, 150.193452];
    var circle1 = L.circle(
            offerorPoints,
            80000,{
                color:'rgb(97, 167, 247)',
                fillColor: 'rgb(97, 167, 247)',
                fillOpacity: 3
            }
     ).addTo(map);
    circle1.bindPopup('<p>Company</p> <div><img style="width:100%" alt="image" src="https://taxuncle.com/wp-content/uploads/2017/06/comp1.jpg"/></div>',
                    { maxWidth:250 }
                );
    
    // Marker circle
    var offerorPoints2 = [-21.198585, 148.128078];    
    var circle2 = L.circle(
            offerorPoints2,
            40000,{
                color:'rgb(154, 119, 216)',
                fillColor: 'rgb(154, 119, 216)',
                fillOpacity: 3
            }
     ).addTo(map);
     circle2.bindPopup('<p>User</p>');
	 
     // Marker myIcon
    var offerorPoints3 = [-27.509917, 152.832329]; 
    var circle3 = L.circle(
            offerorPoints3,
            80000,{
                color:'rgb(97, 167, 247)',
                fillColor: 'rgb(97, 167, 247)',
                fillOpacity: 3
            }
     ).addTo(map);
     circle3.bindPopup('<p>Company</p>');
	});

})();
