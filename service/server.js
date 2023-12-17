const express = require('express');
const axios = require('axios');
var cors = require('cors')
const app = express();
var corsOptions = {
  origin: 'http://localhost:8080'
}
app.use(cors(corsOptions));

const API_KEY = 'cc6af3ddc3889911b9d0f06a9ce2734a';
app.get('/api/weather', (req, res) => {
  const city = req.query.city;
  const units = req.query.units;
  if (!city) {
    return res.status(400).send('The request is missing a city');
  }
  axios.get(`https://api.openweathermap.org/data/2.5/weather?&units=${units}&q=${city}&appId=${API_KEY}`).then(result => {
    res.json(result.data);
  });

});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
