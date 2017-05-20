/**
 * Created by boyachen on 19/5/17.
 * File Name:   mapboxControl.js
 * Author:      Claude Chen
 * Description: Initiate the map and handle events
 *
 */


function init(map) {

    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    // map.scrollZoom.disable();
    map.on('mousemove', function (e) {
        document.getElementById('info').style.display = 'block';
        document.getElementById('info').innerHTML = "<h4>Wikipedia Text Classification</h4>";
        // console.log(e)
    });
    map.on('load', function () {

        // Setting the url for the Topic 1
        let geojsonUrl = "data/ent_geojson.json";

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
                    'circle-radius': 4,
                    'circle-color': '#4c92cf'
                }
            });

            // Interaction Setting
            map.on('mousemove', layerID, function (e) {
                document.getElementById('info').style.display = 'block';
                let feature = e.features[0];
                document.getElementById('info').innerHTML = "<h4>"+feature.properties["name"]+"</h4>";
                // console.log(e)
            });

            map.on('click', layerID, function (e) {
                let feature = e.features[0];
                let lng = e.lngLat.lng.toFixed(4);
                let lat = e.lngLat.lat.toFixed(4);
                let wiki_url = "https://en.wikipedia.org/wiki/"+feature.properties["name"]+"?mobileaction=toggle_view_mobile";
                new mapboxgl.Popup()
                    .setLngLat(e.lngLat)
                    .setHTML("<h3>" + feature.properties["name"] + "</h3>" +
                        '<h4 id="wikibtn" onclick=toggleWiki()>Wikipedia</h4>' +
                        '<iframe id="wikiEmbed" frameborder="no" width=400 height=300 src="' + wiki_url + '"></iframe>' +
                        '<h4>Type</h4>' +
                        '<div>' + feature.properties['type'] + "</div>" )
                    .addTo(map);
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


