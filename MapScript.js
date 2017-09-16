(function() {
    var map = L.map('map', {
        attributionControl: false
    });
    
    L.tileLayer('http://{s}.tile.stamen.com/{style}/{z}/{x}/{y}.png', { 
        style: 'toner-background'
    }).addTo(map);
    $.getJSON("json/states.min.geojson", function(data) {
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
    var offerorPoints = [['BHP Billiton',-35.012330, 150.193452], ['Wesfarmers', -21.198585, 148.128078],['Woolworths Limited', -27.509917, 152.832329],
                        ['BHP Billiton',-17.068037, 145.229661],['Wesfarmers',-18.164455, 140.363697],['Woolworths Limited',-16.360012, 136.650318],['Wesfarmers',-16.591787, 136.166920],
                        ['BHP Billiton',-15.154663, 133.156666],['Wesfarmers',-15.154663, 133.156666],['Woolworths Limited',-13.729055, 131.706470],['Wesfarmers',-15.916771, 128.278736],
                        ['BHP Billiton',-18.122695, 126.125416],['Wesfarmers',-19.267405, 124.301685],['Woolworths Limited',-17.537013, 122.939381],['Wesfarmers',-17.222471, 122.302173],
                        ['BHP Billiton',-21.798085, 116.611256],['Wesfarmers',-25.678979, 115.644459],['Woolworths Limited',-28.996437, 115.864185],['Wesfarmers',-30.598033, 115.732349],
                        ['BHP Billiton',-33.466110, 116.127857],['Wesfarmers',-33.466110, 122.829517],['Woolworths Limited',-31.314056, 126.608814],['Wesfarmers',-32.581832, 136.562428],
                        ['BHP Billiton',-34.050675, 137.902760],['Wesfarmers',-36.983090, 145.834889],['Woolworths Limited',-37.577515, 142.560963],['Wesfarmers',-36.419356, 149.306568],
                        ['BHP Billiton',-34.631238, 150.229420],['Wesfarmers',-34.865940, 140.034107],['Woolworths Limited',-31.670046, 152.272877],['Wesfarmers', -41.595139, 145.526966]];
    for (var i = 0; i < offerorPoints.length; i++) {
			circle = new L.circle([offerorPoints[i][1],offerorPoints[i][2]],
                                30000,{
                                color:'rgb(97, 167, 247)',
                                fillColor: 'rgb(97, 167, 247)',
                                fillOpacity: 3
                            } 
                        ).bindPopup(offerorPoints[i][0])
                        .addTo(map);
                    }
    var refugeePoints = [ [-23.495178, 150.354912],[-31.439620, 151.805107],[-33.954012, 150.486748],[-33.111502, 150.970147],
                        [-36.749174, 149.344170],[-37.832945, 142.620538],[-37.450169, 144.642022],[-37.763496, 146.092217],
                        [-37.798229, 143.323663],[-34.063298, 138.665460],[-35.286956, 140.039200],[-33.985351, 138.984513],
                        [-30.681464, 134.546036],[-32.032372, 116.792131],[-33.179936, 116.660295],[-34.021782, 116.089006],
                        [-28.965936, 115.297991],[-13.160884, 130.634904],[-12.732604, 133.447403],[-14.270861, 131.777482],
                        [-16.632614, 144.882783],[-17.242178, 145.476044],[-41.611569, 147.680286]];
    for (var i = 0; i < refugeePoints.length; i++) {
			circle = new L.circle([refugeePoints[i][0],refugeePoints[i][1]],
                                10000,{
                                color:'rgb(154, 119, 216)',
                                fillColor: 'rgb(154, 119, 216)',
                                fillOpacity: 3
                            } 
                        )
                        .addTo(map);
                    }
    });

})();
