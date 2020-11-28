import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import LayerGroup from 'ol/layer/Group';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import {FullScreen, defaults as defaultControls} from 'ol/control';
import LayerSwitcher from 'ol-layerswitcher';
import { BaseLayerOptions, GroupLayerOptions } from 'ol-layerswitcher';

// Build the map object
const map = new Map({
    controls: defaultControls().extend([new FullScreen()]),
    target: 'map',
    layers: [
        // default layer: Open Street Map
        new TileLayer({
            source: new OSM(),
            title: 'Open Street Map',
        }),
        // Norway ortofoto layer
        new TileLayer({
            title: 'Norway Ortophoto',
            source: new TileWMS({
                extent: [-2500000.0, 3500000.0, 3045984.0, 9045984.0],
                url: 'https://wms.geonorge.no/skwms1/wms.nib',
                // layers: 'ortofoto',
                crossOrigin: 'anonymous',
                params: {'LAYERS': 'ortofoto', 'TILED': true},
                // serverType: 'geoserver'
            })
        })
    ],
    view: new View({
        center: [60.098, 10.2319],
        zoom: 0
    })
});

// Layer Switcher
var layerSwitcher = new LayerSwitcher({
    reverse: true,
    groupSelectStyle: 'group'
  });
  map.addControl(layerSwitcher);
