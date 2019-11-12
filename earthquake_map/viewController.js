/* 
Earthquake Data Format
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


let circleRadiusStops = [
        [1,     3],
        [2,     4],
        [3,     5],
        [4,     6],
        [4.5,   8],
        [5.0,   10],
        [5.5,   13],
        [6,     14],
        [6.5,   16],
        [7,   20],
        [8,   25]
];
var circleColorStops = [
    [4,'rgba(255, 0, 70, 0.4)'],
    [4.5,'rgba(240, 0, 70, 0.45)'],
    [5.0, 'rgba(200, 0, 70, 0.5)'],
    [5.5, 'rgba(180, 0, 70, 0.55)'],
    [6, 'rgba(160, 0, 70, 0.6)'],
    [6.5, 'rgba(140, 0, 70, 0.8)']
];

mapboxgl.accessToken = 'pk.eyJ1IjoiY2hpbnN0YSIsImEiOiJjaW15ZnFyN3cwNDN5dm9sdWJ2am5xNmdlIn0.vG5mqJyfSX3JBSQ3UQ6ORw';
var dateInterval = 1;
var url = getRealtimeUrl(dateInterval);

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    zoom: 1,
    minZoom: 1,
    center: [109.6754523, 19.019904]
});

function getRealtimeUrl(dataInterval){
    /*
        Get the realtime and request URL    
    */
    var d = new Date();
    d.setDate(d.getDate() - dataInterval);
    let day = d.getDate();
    let mon = d.getMonth()+1;
    let yea = d.getFullYear();
    queryDate = yea + "-" + mon + "-" + day
    console.log(queryDate)
    let url = "https://earthquake.usgs.gov/fdsnws/event/1/";
    let minMag = "3";
    var para = "query?format=geojson&starttime=" + queryDate + "&minmagnitude="+minMag;
    url = url + para;
    return url
}

// Earthquake Data Acquire
function getEarthquakeData(dateInterval) {
    
    map.on('load', function () {
        map.loadImage('images/earth_icn.png', function(error, icon) {
            if (error) throw error;
            map.addImage('quake', icon);
            map.addSource('earthquake', { type: 'geojson', data: url });
            map.addLayer({
                "id": "earthquake",
                "type": "circle",
                "source": 'earthquake',
                'paint': {
                    // make circles larger as the user zooms from z12 to z22
                    // 'circle-radius': 5,
                    'circle-radius': {
                        property: "mag",
                        type: 'exponential',
                        stops: circleRadiusStops
                    },
                    // color circles by ethnicity, using data-driven styles
                    // 'circle-color': 'rgba(255, 0, 70, 0.8)'
                    'circle-color': {
                        property: "mag",
                        type: 'exponential',
                        stops: circleColorStops
                    }
                }
            });
            
            var popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false
            });
            
            // Adding Popups
            map.on('mouseenter', 'earthquake', function (e) {
                map.getCanvas().style.cursor = 'pointer';
                var d = new Date(parseInt(e.features[0].properties.time));
                var coord = e.features[0].geometry.coordinates
                // var googleAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + 
                    // coord[1] + "," + coord[0] + "&key=AIzaSyDPnyJbnRJFI_XzGB8HtU2pB86dYZQ8ZNI"
                
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
                
                popup
                    .setLngLat(e.features[0].geometry.coordinates)
                    .setHTML(shownHTML)
                    .addTo(map);
            });
            // Events when cursor leaves the markers
            map.on('mouseleave', 'earthquake', function () {
                map.getCanvas().style.cursor = '';
                popup.remove();
            });
        });
    });
}

// function buttonsFuncionalize(){
//     $("#sideBtnSettings").on("click", function(){
//         var sLeft = $("#settingPanel").css("transform").replace(/[^-\d\.]/g, '');
//         var sLeft = parseInt(sLeft) > 0 ? "0" : "100px"
//         console.log(sLeft)
//         $("#settingPanel").css("left", sLeft)
//     });
// }

// ---------------------------------------- Ready -------------------------------------------

$(document).ready(function () {
    
    // some initialization actions.
    // buttonsFuncionalize();
    $(".mapboxgl-ctrl-bottom-right").css("display", "none");
    
    getEarthquakeData(dateInterval)
    $("#dateInput")[0].value = dateInterval;
    
    // Change Date Interval
    // Refresh data after selected days interval
    $("#dateInput").on("change", function(){
        var newDateInterval = parseInt(this.value);
        if (newDateInterval!=NaN){
            url = getRealtimeUrl(newDateInterval);
            console.log("Start Loading ...")
            map.getSource('earthquake').setData(url);
            console.log("Start Completed!")
        }
        $("#dateDisplaying")
        .css("opacity","0.3")
        .css("color", "#fff")
        .css("background","rgba(255, 255, 255, 0)");
    })
    
    $("#dateInput").on("input", function(){
        $("#dateDisplaying")
            .css("opacity","1")
            .css("background", "rgba(255, 255, 255, 0.9)")
            .css("color", "#000")
            .html("Last " + this.value + (this.value == 1 ? " day" : " days"));
    })
    
    // Other maps setup
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));
    
})
