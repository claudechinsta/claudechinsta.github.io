mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbnN0YSIsImEiOiJjaW15ZnFyN3cwNDN5dm9sdWJ2am5xNmdlIn0.vG5mqJyfSX3JBSQ3UQ6ORw';

var dateInterval = 10;
var url = getRealtimeUrl(dateInterval);

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    zoom: 1,
    minZoom: 1,
    center: [109.6754523, 19.019904]
});

var colorMapping = [
    [40, "rgba(230, 214, 218, 0.8)"],
    [42, "rgba(217, 141, 161, 0.8)"],
    [45, "rgba(219, 85, 122, 0.8)"],
    [48, "rgba(219, 53, 99, 0.8)"],
    [50, "rgba(255, 0, 70, 0.8)"]
];

var lat = undefined;
var lon = undefined;

function getPos() {
    if (lat === undefined) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                lat = pos.coords.latitude
                lon = pos.coords.longitude
                map.loadImage('./images/location-icon-png.png', function (error, image) {
                    if (error) throw error;
                    map.addImage('locMarker', image);
                    map.addLayer({
                        "id": "myLocation",
                        "type": "symbol",
                        "source": {
                            "type": "geojson",
                            "data": {
                                "type": "FeatureCollection",
                                "features": [{
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [lon, lat]
                                    }
                                }]
                            }
                        },
                        "layout": {
                            "icon-image": "locMarker",
                            "icon-size": 0.1
                        }
                    });
                });
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
        map.flyTo({
            center: [lon, lat],
            duration: 2000,
            zoom: 3
        });
    } else {
        map.flyTo({
            center: [lon, lat],
            duration: 2000,
            zoom: 3
        });
    }
}

function buttonsFuncionalize() {
    $("#sideBtn1").on('click', function () {
        getEarthquakeData(20)
    })
}

function getRealtimeUrl(dataInterval){
    var d = new Date();
    d.setDate(d.getDate() - dataInterval);
    let day = d.toLocaleDateString().substr(0, 2);
    let mon = d.toLocaleDateString().substr(3, 2);
    let yea = d.toLocaleDateString().substr(6, 4);
    queryDate = yea + "-" + mon + "-" + day
    let url = "https://earthquake.usgs.gov/fdsnws/event/1/"
    var para = "query?format=geojson&starttime=" + queryDate + "&minmagnitude=4";
    url = url + para;
    return url
}

// Earthquake Data Acquire
function getEarthquakeData(dateInterval) {

    map.on('load', function () {
        
        // window.setInterval(function() {
        // dataInterval += 1;
        // map.getSource('earthquake').setData(url);
        console.log("updated!"+url);
        // }, 4000);

        map.addSource('earthquake', { type: 'geojson', data: url });
        
        map.addLayer({
            "id": "earthquake",
            "type": "circle",
            "source": 'earthquake',
            'paint': {
                // make circles larger as the user zooms from z12 to z22
                'circle-radius': 5,
                // 'circle-radius': {
                //     property: "displayRadius",
                //     type: 'identity'
                // },
                // color circles by ethnicity, using data-driven styles
                'circle-color': 'rgba(255, 0, 70, 0.8)'
                // 'circle-color': {
                //     property: "magScale",
                //     type: 'interval',
                //     stops: colorMapping
                // }
            }
        });
        
        var popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false
        });
        
        map.on('mouseenter', 'earthquake', function (e) {
            var d = new Date(parseInt(e.features[0].properties.time));
            map.getCanvas().style.cursor = 'pointer';
            
            var coord = e.features[0].geometry.coordinates
            var googleAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + coord[1] + "," + coord[0] + "&key=AIzaSyDPnyJbnRJFI_XzGB8HtU2pB86dYZQ8ZNI"
            
            
            
            var shownHTML = '<div class="map-popup"> \
            <div class="largeFont">Quick Info</div> \
            <div class="upperSpace"> \
            <div class="mag-part"> \
            <div class="subTitle">Magnitude</div> \
            <div class="bigFont" id="megDeg">' + e.features[0].properties.mag.toFixed(1) + '</div> \
            </div> \
            <div class="date-part"> \
            <div class="subTitle">Time</div> \
            <div class="dateDate midFont">' + d.toLocaleString().substr(0, 10) + '<br>' +
            d.toLocaleString().substr(12, 8) + '</div> \
            </div> \
            </div> \
            <div class="location-part"> \
            <div class="subTitle">Location</div> \
            <div class="locationInfo">' + e.features[0].properties.place + '</div> \
            </div> \
            </div>';
            
            popup.setLngLat(e.features[0].geometry.coordinates)
            .setHTML(shownHTML)
            .addTo(map);
        });
        // Events when cursor leaves the markers
        map.on('mouseleave', 'earthquake', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });
    });
    
    /*
    alert:null
    cdi:null
    code:"2000a69d"
    detail:"https://earthquake.usgs.gov/fdsnws/event/1/query?eventid=us2000a69d&format=geojson"
    dmin:3.255
    felt:null
    gap:74
    ids:",us2000a69d,"
    mag:5
    magType:"mb"
    mmi:null
    net:"us"
    nst:null
    place:"119km ESE of Pangai, Tonga"
    rms:1.27
    sig:385
    sources:",us,"
    status:"reviewed"
    time:1502261875520
    title:"M 5.0 - 119km ESE of Pangai, Tonga"
    tsunami:0
    type:"earthquake"
    types:",geoserve,origin,phase-data,"
    tz:-720
    updated:1502262985040
    url:"https://earthquake.usgs.gov/earthquakes/eventpage/us2000a69d"
    */
    
}

// ---------------------------------------- Ready -------------------------------------------

$(document).ready(function () {
    
    // some initialization actions.
    // buttonsFuncionalize();
    $(".mapboxgl-ctrl-bottom-right").css("display", "none");
    
    getEarthquakeData(dateInterval)
    $("#dateInput")[0].value = dateInterval;

    // Change Date Interval
    $("#dateInput").on("change", function(){
        var newDateInterval = parseInt(this.value);
        if (newDateInterval!=NaN){
            if (newDateInterval <= 100 && newDateInterval > 0){
                url = getRealtimeUrl(newDateInterval)
                map.getSource('earthquake').setData(url);
            }else{
                window.alert("Please input days between 0 to 100");
            }
        }
        $("#dateDisplaying").css("opacity","0");
    })

    $("#dateInput").on("input", function(){
        $("#dateDisplaying").css("opacity","1");
        $("#dateDisplaying").html("Last "+this.value+" days")
    })
    
    // Other maps setup
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));
    
})
