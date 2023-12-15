const express = require('express');
const axios = require('axios');
const app = express();
 
const API_KEY = 'cc6af3ddc3889911b9d0f06a9ce2734a';

app.get('/', (req, res) => {
  axios.get(`https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=chicago&appId=${API_KEY}`).then(result => {
    res.json(result.data);
  });

});

app.get('/:id', (req, res) => {
	const city = req.params.id;
	axios.get(`https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=${city}&appId=${API_KEY}`).then(result => {
    		res.json(result.data);
  	});
})

app.listen(3000, () => console.log('Example app is listening on port 3000.'));
