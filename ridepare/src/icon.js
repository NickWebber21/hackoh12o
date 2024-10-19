import L from 'leaflet';

const iconPerson = new L.Icon({
    iconUrl: require('../node_modules/leaflet/dist/images/marker-icon.png'),
    iconRetinaUrl: require('../node_modules/leaflet/dist/images/marker-icon-2x.png'),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

export { iconPerson };
