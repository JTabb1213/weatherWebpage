const config = require('config');
let _delegate;
const PROVIDERS = {
    OPENWEATHER: 'openweathermap',
    WEATHERAPI: 'weatherapi'
}
const provider = config.get("providers.weather");

// Check to see if the provider is openweathermap, if not default to weatherapi
_delegate = provider === PROVIDERS.OPENWEATHER ? require('./providers/openweathermap') : require('./providers/weatherapi');
console.log(`Using ${provider} as the weather service provider`);
async function getWeather(units, city) {
    return _delegate.getWeather.apply(_delegate, arguments);
}

module.exports = {
    getWeather: getWeather
}