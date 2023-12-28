const config = require('config');
let _delagate;

const PROVIDERS = {
    GOOGLEMAPAPI: 'googlemapapi'
}

const provider = config.get("providers.map");
_delagate = require('./providers/googleMapApi');
console.log(`Using ${provider} as the map provider`);
async function getMapUrl(city) {
    return _delagate.getMapUrl.apply(_delagate, arguments);
}

module.exports = {
    getMapUrl: getMapUrl
}
