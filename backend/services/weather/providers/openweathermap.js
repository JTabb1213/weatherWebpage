const axios = require("axios");
const API_KEY = 'cc6af3ddc3889911b9d0f06a9ce2734a';

async function getWeather(city, units) {
    console.log(`Fetching weather from openweathermap`);
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?&units=${units}&q=${city}&appId=${API_KEY}`).then(result => {
        return result.data;
    });
}

module.exports = {
    getWeather: getWeather
}