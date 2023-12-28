const express = require('express');
const weatherService = require('./services/weather');
const locationService = require('./services/location');
const mapService = require('./services/map');
const cors = require('cors');
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);
app.use('/', express.static('../static'));

app.get('/api/map', (req, res) => {
  const { city } = req.query
  if (!city) {
    return res.status(400).send('The request is missing a city');
  }
  mapService.getMapUrl(city).then(result => {
    if (!result) {
      return res.status(404).json({message: 'City not found, or there were more than 1 candidates'});
    }
    res.json({
      mapUrl: result
    });
  })
})


app.get('/api/weather', (req, res) => {
  // Do validation of the request
  const city = req.query.city;
  const units = req.query.units;
  if (!city) {
    return res.status(400).send('The request is missing a city');
  }
  weatherService.getWeather(city, units).then(result => {
    res.json(result);
  }).catch(err => {
    res.status(err.response.status).json({message: err.response.statusText});
  });
});

app.get('/api/geolocation', (req, res) => {
  const city = req.query.address;
  locationService.getCoordinates(city).then(result => {
    res.json(result);
  }).catch(err => {
    res.status(err.response.status).json({message: err.response.statusText});
  })
});

app.listen(4000, () => console.log('Example app is listening on port 4000.'));
