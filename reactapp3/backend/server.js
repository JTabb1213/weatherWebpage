const express = require('express');
const cors = require('cors');
const weatherService = require('./services/weather');
const locationService = require('./services/location');
const app = express();

app.use(
    cors({
        //origin: "http:/localhost:3000"
    })
);

app.get('/api/weather', (req, res) => {
    // Do validation of the request
    const city = req.query.city;
    const units = req.query.units;
    if (!city) {
        return res.status(400).send('The request is missing a city');
    }
    weatherService.getWeather(city, units).then(result => {
        res.json(result);
    })
});

app.get('/api/geolocation', (req, res) => {
    const city = req.query.address;
    locationService.getCoordinates(city).then(result => {
        res.json(result);
    })
});

app.listen(4000, () => console.log('Example app is listening on port 4000.'));