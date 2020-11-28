import 'ol/ol.css';
import 'ol-layerswitcher/dist/ol-layerswitcher.css';

import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import LayerGroup from 'ol/layer/Group';
import TileWMS from 'ol/source/TileWMS';
import WMTS from 'ol/source/WMTS';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import OSM from 'ol/source/OSM';
import {get as getProjection} from 'ol/proj';
import {getTopLeft, getWidth} from 'ol/extent';
import {FullScreen, defaults as defaultControls} from 'ol/control';
import LayerSwitcher from 'ol-layerswitcher';

var projection = getProjection('EPSG:3857');
var projectionExtent = projection.getExtent();
var size = getWidth(projectionExtent) / 256;
var resolutions = new Array(14);
var matrixIds = new Array(14);
for (var z = 0; z < 50; ++z) {
  // generate resolutions and matrixIds arrays for this WMTS
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = z;
}

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
        new TileLayer({
            title: 'Norway Ortophoto (Geonorge WMTS)',
            source: new WMTS({
                url: 'http://opencache.statkart.no/gatekeeper/gk/gk.open_nib_web_mercator_wmts_v2?',
                layer: 'Nibcache_web_mercator_v2',
                matrixSet: 'default028mm',
                format: 'image/png',
                tileGrid: new WMTSTileGrid({
                    origin: getTopLeft(projectionExtent),
                    resolutions: resolutions,
                    matrixIds: matrixIds,
                  }),
                  style: 'default',
                  wrapX: true,
            }),
        })
    ],
    view: new View({
        center: [10.210, 60.094],
        zoom: 2
    })
});

// Layer Switcher
var layerSwitcher = new LayerSwitcher({
    reverse: true,
    groupSelectStyle: 'group'
  });
  map.addControl(layerSwitcher);