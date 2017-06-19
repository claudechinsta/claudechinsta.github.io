/**
 * Created by boyachen on 19/5/17.
 * File Name:   mapboxControl.js
 * Author:      Claude Chen
 * Description: Initiate the map and handle events
 *
 */

let colorMap_dict = {
    "place": "#a99d00",
    "building": "#a53545",
    "leisure": "#b3398b",
    "amenity": "#7349a4",
    "aeroway": "#4f94d3",
    "waterway": "#004ca4",
    "public_transport": "#00c1c1",
    "route": "#153a6b",
    "natural": "#009d1a",
    "landuse": "#1f4b00",
    "other": "#414141"
};

let colorMap = [
    ["place", colorMap_dict["place"]],
    ["building", colorMap_dict["building"]],
    ["tourism", colorMap_dict["leisure"]],
    ["leisure", colorMap_dict["leisure"]],
    ["amenity", colorMap_dict["amenity"]],
    ["office", colorMap_dict["amenity"]],
    ["aeroway", colorMap_dict["aeroway"]],
    ["waterway", colorMap_dict["waterway"]],
    ["public_transport", colorMap_dict["public_transport"]],
    ["route", colorMap_dict["route"]],
    ["natural", colorMap_dict["natural"]],
    ["landuse", colorMap_dict["landuse"]],
    ["other", colorMap_dict["other"]]
];

function init(map) {

    // Add zoom and rotation controls to the map.
    // map.addControl(new mapboxgl.NavigationControl(), 'top-left');
    // map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
    // map.scrollZoom.disable();
    $.getJSON("data/countries.geo.json", function (data) {
        console.log(data);

        map.addLayer({
            'id': "world_geo",
            'type': 'fill',
            'source': {
                'type': 'geojson',
                'data': data
            },
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'fill-color': '#088',
                'fill-opacity': 0.5,
                'fill-outline-color': '#454',
                'fill-antialias': true
            }
        });
    })
}