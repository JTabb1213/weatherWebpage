const express = require('express');
const weatherService = require('./services/weather');
const locationService = require('./services/location');
const mapService = require('./services/map');
const userService = require('./services/users');
const session = require('express-session');
const cors = require('cors');
const redis = require('redis');
const connectRedis = require('connect-redis');
var bodyParser = require('body-parser');
const { findUsernameAndPassword, closeConnection } = require('./databaseSearch');
const { addUser, endConnection } = require('./addUser');
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_USERNAME = process.env.REDIS_USERNAME;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// enable this if you run behind a proxy (e.g. nginx)
app.set('trust proxy', 1);

let redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
    redisUrl = `redis://${REDIS_USERNAME ? REDIS_USERNAME + ':' : ''}${REDIS_PASSWORD ? REDIS_PASSWORD + '@' : ''}${REDIS_HOST}:${REDIS_PORT}`
}
const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
    url: redisUrl
})

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

//Configure session middleware
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'secret$%^134',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: false, // if true prevent client side JS from reading the cookie 
        maxAge: 1000 * 60 * 10 // session max age in miliseconds
    }
}))

function isLoggedIn(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized' });
    }
}

app.get('/api/map', isLoggedIn, (req, res) => {
    const { city } = req.query
    if (!city) {
        return res.status(400).send('The request is missing a city');
    }
    mapService.getMapUrl(city).then(result => {
        if (!result) {
            return res.status(404).json({ message: 'City not found, or there were more than 1 candidates' });
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
        res.status(err.response.status).json({ message: err.response.statusText });
    });
});

app.get('/api/geolocation', isLoggedIn, (req, res) => {
    const city = req.query.address;
    locationService.getCoordinates(city).then(result => {
        res.json(result);
    }).catch(err => {
        res.status(err.response.status).json({ message: err.response.statusText });
    })
});

app.post('/api/login', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(400).json({ message: 'Missing username or password' });
    }

    userService.findUser(username, password).then(result => {
        if (!result) {
            res.status(404).json({ message: "User not found" });
        } else {
            req.session.user = result;
            res.status(200).json(result);
        }
    }).catch(error => {
        console.error(error);
        res.status(500).json({ message: "database error" });
    })
});

app.post('/api/createUser', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    userService.createUser(username, password).then(result => {
        if (result) {
            res.status(200).json({ message: 'User added' });
        } else {
            res.status(400).json({ message: 'failed to add user' });
        }
    }).catch(error => {
        console.error(error);
        res.status(500).json({ message: 'database error' });
    })
});

app.post('/api/logout', (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return console.log(err);
        }
        //res.redirect("/")
        res.status(200).json({});
    });
})

app.listen(4000, () => console.log('Example app is listening on port 4000.'));