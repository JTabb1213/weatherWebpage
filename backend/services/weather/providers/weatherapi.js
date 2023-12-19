const API_KEY = '833ddf324d9242eda33142516231812';

const axios = require("axios");

async function getWeather(city, units) {
    console.log(`Fetching weather from weatherapi`);
    return axios.get(`http://api.weatherapi.com/v1/current.json?q=${city}&key=${API_KEY}&aqi=no`).then(result => {
        // Transform the response to our data contract, which is technically the openweathermap response
        const location = result.data.location;
        const current = result.data.current;
        return {
            name: location.name,
            main: {
                temp: current.temp_f,
                humidity: current.humidity,
                feels_like: current.feelslike_f
            },
            wind: {
                speed: current.wind_mph
            },
            weather: [{
                main: current.condition.text
            }]

        }
    });
}

module.exports = {
    getWeather: getWeather
}