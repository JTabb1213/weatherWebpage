const axios = require('axios');
const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'weather',
    port: '5432',
});

async function getWeatherData(city) {
    console.log('made it to get weather');
    const apiKey = 'cc6af3ddc3889911b9d0f06a9ce2734a';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=${city}&appId=${apiKey}`
    console.log('made it to apiUrl ');
    try {
        const response = await axios.get(apiUrl);
        console.log('made it to axios')
        return response.data;
    } catch (error) {
        console.error('Error getting data');

    }
}

async function addWeatherData(city, weatherData) {
    console.log('made it to add weather')
    const client = await pool.connect();
    try {
        const result = await client.query(
            `INSERT INTO cities (name,  \"tempActual\", humidity,  \"windSpeed\",  \"tempFeelsLike\", skies,  \"createdAt\",  \"updatedAt\") 
            VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
            ON CONFLICT (name) DO UPDATE
            SET
                "tempActual" = EXCLUDED."tempActual",
                humidity = EXCLUDED.humidity,
                "windSpeed" = EXCLUDED."windSpeed",
                "tempFeelsLike" = EXCLUDED."tempFeelsLike",
                skies = EXCLUDED.skies,
                "updatedAt" = NOW()`
            ,
            [city, weatherData.main.temp, weatherData.main.humidity, Math.round(weatherData.wind.speed), weatherData.main.feels_like, weatherData.weather[0].main]
        );
        return result;

    } finally {
        client.release();
    }
}

async function refreshData() {
    const cities = ['chicago', 'pyongyang'];
    for (const city of cities) {
        try {
            const weatherData = await getWeatherData(city);
            await addWeatherData(city, weatherData);
        } catch (error) {
            console.error('error adding data', error.message);
        }
    }

    pool.end();
}

module.exports = {
    refreshData: refreshData
}