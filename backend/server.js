const express = require('express');
const basicAuth = require('express-basic-auth');
const weatherService = require('./services/weather');
const locationService = require('./services/location');
const mapService = require('./services/map');
const session = require('express-session');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// This is a very primitive user storage implementation
const USERS = {
    foo: 'bar'
}
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(session({
    secret: 'my secret',
    saveUninitialized: true,
    resave: false,
    proxy: true,
    name: "jacks-weather-app",
    cookie: {
        httpOnly: true,
    }
}));

function isLoggedIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({message: 'Not authorized'});
    }
}

app.get('/api/map', isLoggedIn, (req, res) => {
    const {city} = req.query
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


app.get('/api/weather', isLoggedIn, (req, res) => {
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

app.get('/api/geolocation', isLoggedIn, (req, res) => {
    const city = req.query.address;
    locationService.getCoordinates(city).then(result => {
        res.json(result);
    }).catch(err => {
        res.status(err.response.status).json({message: err.response.statusText});
    })
});

app.post('/api/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(400).json({message: 'Missing username or password'});
    }
    const storedPass = USERS[username];
    if (!storedPass) {
        return res.status(400).json({message: 'User not found'});
    }
    if (storedPass !== password) {
        return res.status(400).json({message: 'Password does not match'});
    }
    req.session.user = username;
    res.status(200).json({});
});

app.listen(4000, () => console.log('Example app is listening on port 4000.'));
