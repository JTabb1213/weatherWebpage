const config = require('config');
let _delagate;
const PROVIDERS = {
    GOOGLEMAPAPI: 'googlemapapi'
}

const provider = config.get("providers.map");
_delagate = require('./providers/googleMapApi');
console.log(`Using ${provider} as the map provider`);
async function getMap(center) {
    return _delagate.getMap.apply(_delagate, arguments);
}

module.exports = {
    getMap: getMap
}
