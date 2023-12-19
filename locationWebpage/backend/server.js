const express = require('express');
const app = express();
const locationService = require('./services/location');
const cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:54774'
}

app.use(cors(corsOptions));

app.get('/api/geolocation', (req, res) => {
  const city = req.query.address;
  locationService.getCoordinates(city).then(result => {
    res.json(result);
  })
});
app.listen(3000, () => console.log('Example app is listening on port 3000.'));
