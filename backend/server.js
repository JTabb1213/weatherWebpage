const express = require('express');
const cors = require('cors');
const weatherService = require('./services/weather');
const app = express();
var corsOptions = {
  origin: 'http://localhost:8080'
}
app.use(cors(corsOptions));


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

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
