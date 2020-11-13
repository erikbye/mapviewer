import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OSM from 'ol/source/OSM';
import {FullScreen, defaults as defaultControls} from 'ol/control';

// var layers = [
//     new TileLayer({
//         source: new OSM(),
//     }),
//     new TileLayer({
//         extent: [],
//         source: new TileWMS({
//             url: 'https://wms.geonorge.no/skwms1/wms.nib',
//             params: {'LAYERS': 'topp:states', TILED: true},
//             serverType: 'geoserver',
//             transition: 0,
//         }),
//     })
// ];

const map = new Map({
    controls: defaultControls().extend([new FullScreen()]),
    target: 'map',
    layers: [
        // new TileLayer({
        //     source: new OSM()
        // }),
        new TileLayer({
            source: new TileWMS({
                extent: [-2500000.0, 3500000.0, 3045984.0, 9045984.0],
                url: 'https://wms.geonorge.no/skwms1/wms.nib',
                crossOrigin: 'anonymous',
                serverType: 'geoserver',
                layers: 'ortofoto'
            })
        })
    ],
    view: new View({
        center: [60.098, 10.2319],
        zoom: 0
    })
});
