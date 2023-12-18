const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const apiKey = "AIzaSyD3AjCFux3-Q7YoYo-v1OyjcOY0tabKUVc";
var corsOptions = {
  origin: 'http://localhost:52766'
}

app.use(cors(corsOptions));

app.get('/api/geolocation', (req, res) => {
  const city = req.query.address;
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`).then(result => {
    console.log(result.data);

    res.json(result.data);
  });

})
app.listen(3000, () => console.log('Example app is listening on port 3000.'));
