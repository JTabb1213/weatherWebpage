const config = require('config');
let _delagate;
const PROVIDERS = {
    GOOGLEAPI: 'googleapi'
}

const provider = config.get("providers.location");
_delagate = require('./providers/googleAPI');
console.log(`Using ${provider} as the location provider`);
async function getCoordinates(city) {
    return _delagate.getCoordinates.apply(_delagate, arguments);
}

module.exports = {
    getCoordinates: getCoordinates
}