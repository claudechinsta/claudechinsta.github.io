/**
 * Created by boyachen on 19/5/17.
 * File Name:   mapboxControl.js
 * Author:      Claude Chen
 * Description: Initiate the map and handle events
 *
 */


function init(map) {

    // Add zoom and rotation controls to the map.
    // map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    // map.scrollZoom.disable();
    map.on('mousemove', function (e) {


        document.getElementById('info').style.display = 'block';
        document.getElementById('info').innerHTML = "<h4>Wikipedia Text Classification</h4>";
        // console.log(e)
    });
    map.on('load', function () {

        // Setting the url for the Topic 1
        let geojsonUrl = "data/ent_geojson_3377.json";

        let layerID = "aus_entities";

        $.getJSON(geojsonUrl, function (data) {

            console.log(data);

            // Layer Name: aus entities
            map.addLayer({
                'id': layerID,
                'type': 'circle',
                'source': {
                    'type': 'geojson',
                    'data': data
                },
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'circle-radius': {
                        'base': 1.75,
                        'stops': [
                            [3, 3],
                            [10, 5]
                        ]
                    },
                    'circle-color': "rgba(50, 104, 45, 0.7)"
                }
            });

            map.addLayer({
                'id': layerID+"_hover",
                'type': 'circle',
                'source': {
                    'type': 'geojson',
                    'data': data
                },
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'circle-radius': 20,
                    'circle-color': "rgba(50, 104, 45, 0.3)",
                    'circle-opacity': 0.4
                },
                "filter": ["==", "name", ""]
            });

            // Interaction Setting
            map.on('mousemove', layerID, function (e) {
                let feature = e.features[0];

                var ent_type = feature.properties['type'].split(" ");
                var tp = "";
                ent_type.forEach(function (data) {
                    tp += "#"+data+" "
                });
                document.getElementById('info').style.display = 'block';
                document.getElementById('info').innerHTML = "<h2>"+feature.properties["name"]+"<h5>" + tp + "</h5></h2>";
                // console.log(e)
            });

            map.on('click', layerID, function (e) {
                let feature = e.features[0];
                let lng = e.lngLat.lng.toFixed(4);
                let lat = e.lngLat.lat.toFixed(4);
                let wiki_url = "https://en.wikipedia.org/wiki/"+feature.properties["name"]+"?mobileaction=toggle_view_mobile";
                // var ent_type = feature.properties['type'].split(" ");
                // var tp = "";
                // ent_type.forEach(function (data) {
                //     tp += "#"+data+" "
                // });
                new mapboxgl.Popup({"anchor": "bottom-left"})
                    .setLngLat(e.lngLat)
                    .setHTML("<h3 style='margin-left: 20px; margin-right: 20px'>" + feature.properties["name"] + "</h3>" +
                        '<button id="wikibtn" class="btn btn-default btn-sm" onclick=toggleWiki() style="margin-bottom: 10px;">Wikipedia</button>' +
                        '<iframe id="wikiEmbed" frameborder="no" width=450 height=300 src="' + wiki_url + '"></iframe>')
                    .addTo(map);
            });

            // Set Filter Circus
            map.on('mouseover', layerID, function (e) {
                if(map.getZoom() > 8){
                    map.setFilter(layerID+"_hover", ["==", "name", e.features[0].properties.name]);
                }

            });

            map.on("mouseleave", layerID, function() {
                map.setFilter(layerID+"_hover", ["==", "name", ""]);
            });

            cursorChange(layerID);
        });
    });
}

function toggleWiki() {
    var ifDisplay = $("#wikiEmbed").css("display");
    console.log(ifDisplay);
    let result = ifDisplay==="none" ? "block" : "none";
    $("#wikiEmbed").css({"display": result});
}


function cursorChange(layerID){
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', layerID, function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', layerID, function () {
        map.getCanvas().style.cursor = '';
    });
}


