/**
 * Created by boyachen on 19/5/17.
 * File Name:   mapboxControl.js
 * Author:      Claude Chen
 * Description: Initiate the map and handle events
 *
 */

let colorMap_dict = {
    "place": "#a56d00",
    "building": "#a53545",
    "leisure": "#b3398b",
    "amenity": "#7349a4",
    "aeroway": "#4f94d3",
    "waterway": "#004ca4",
    "public_transport": "#00adad",
    "route": "#2f3254",
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
    // map.scrollZoom.disable();
    map.on('mousemove', function (e) {

        document.getElementById('info').style.display = 'block';
        document.getElementById('info').innerHTML = "<h4>Wikipedia Text Classification</h4>";
        // console.log(e)
    });
    map.on('load', function () {

        // Setting the url for the Topic 1
        let geojsonUrl = "data/ent_geojson_3377_with_sents.json";

        let layerID = "aus_entities";

        $.getJSON(geojsonUrl, function (data) {

            console.log(data);
            // Re-format the data, Only show the entities with "topic" sentences
            features_with_sents = [];
            data.features.forEach(function(feat){
                feat["properties"]["e_type"] = getEntType(feat["properties"]["type"]);
                if (feat['properties'].hasOwnProperty("sentences")){
                    feat['properties']['geo_sent'] = feat['properties']['sentences'].length > 0 ? feat['properties']['sentences'][0] : " -- "
                    feat['properties']['has_sent'] = "true";
                    features_with_sents.push(feat)
                }
                // else{
                //     feat['properties']['has_sent'] = "false";
                //     delete feat;
                // }
            });
            data.features = features_with_sents;
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
                    'circle-color': // "#de4509"
                        {
                            property: "e_type",
                            type: "categorical",
                            stops: colorMap
                        }
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
                    'circle-color': "rgba(22, 22, 22, 0.3)",
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
                document.getElementById('info').innerHTML = "<h3>"+feature.properties["name"]+"</h3><h4>" + tp + "</h4>"+
                    "<div style='height: 10px'></div>"
                // console.log(e)
            });

            map.on('click', layerID, function (e) {
                let feature = e.features[0];
                let feature_type = feature.properties['type'];
                console.log(colorMap_dict[feature['properties']['e_type']]);
                // let lng = e.lngLat.lng.toFixed(8);
                // let lat = e.lngLat.lat.toFixed(8);
                let coord = feature['geometry']['coordinates'];
                let wiki_url = "https://en.wikipedia.org/wiki/"+feature.properties["name"]+"?mobileaction=toggle_view_mobile";
                let sentence = feature['properties'].hasOwnProperty("geo_sent") ? feature['properties']["geo_sent"] : "[No, Desciption]";
                new mapboxgl.Popup({"anchor": "bottom-left"})
                    .setLngLat(coord)
                    .setHTML("<h3 style='font-size:28px; margin-left: 20px; margin-right: 20px'>" + feature.properties["name"] + "</h3>" +
                        '<h4>'+feature_type+'</h4>' +
                        '<p id="popupSent">'+sentence+'</p>' +
                        '<iframe id="wikiEmbed" frameborder="no" width=400 height=300 src="' + wiki_url + '"></iframe>' +
                        '<label id="wikibtn" onclick=toggleWiki() style="margin-bottom: 5px;">WIKIPEDIA PAGE</label>' +
                        '<div><label id="wikibtn" onclick=flyTo('+coord+')>FLY HERE!</label></div>')
                    .addTo(map);
                $("div.mapboxgl-popup-content").find("h3, h4").css("color", colorMap_dict[feature['properties']['e_type']])
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

function getEntType(data){
    if(data.indexOf("place") !== -1) {
        return "place";
    }
    if(data.indexOf("building") !== -1) {
        return "building";
    }
    else if(data.indexOf("leisure") !== -1 || data.indexOf("tourism") !== -1) {
        return "leisure";
    }
    else if (data.indexOf("amenity") !== -1 || data.indexOf("office") !== -1){
        //Amenity Covering an assortment of community facilities including toilets, telephones, banks,
        // pharmacies and schools.
        return "amenity";
    }
    else if (data.indexOf("aeroway") !== -1) {
        // Describes the fixed physical infrastructure associated with the air travel, including airports,
        //runways, helipads, and terminal buildings.
        return "aeroway";
    }
    else if (data.indexOf("waterway") !== -1) {
        return "waterway";
    }
    else if (data.indexOf("public_transport") !== -1) {
        return "public_transport";
    }
    else if (data.indexOf("route") !== -1 || data.indexOf("highway") !== -1){
        return "route";
    }
    else if (data.indexOf("natural") !== -1){
        return "natural";
    }
    else if (data.indexOf("landuse") !== -1) {
        // Land use describes the human use of land, for example fields, pastures, and settlements.
        return "landuse";
    }
    else {
        return "other"
    }
}

function toggleWiki() {
    var ifDisplay = $("#wikiEmbed").css("display");
    console.log(ifDisplay);
    let result = ifDisplay==="none" ? "block" : "none";
    $("#wikiEmbed").css({"display": result});
}

function flyTo(coordx, coordy) {
    console.log(coordx);
    console.log(coordy);
    map.flyTo({
        center: [coordx, coordy],
        duration: 1000,
        zoom: 13
    })
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


