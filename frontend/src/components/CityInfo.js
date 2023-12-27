import { useState } from 'react'
import {
    Box,
    Flex,
} from '@chakra-ui/react'

import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import './CityInfo.css'
import React, { useEffect } from 'react';


function CityInfo() {
    const [city, setCity] = useState("");
    const [geo, setGeo] = useState([]);
    const [weather, setWeather] = useState([]);
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const center = { lat, lng }
    const [mapData, setMapData] = useState(null);
    /*
    const apiKey = 'AIzaSyB69lSr663-tF6TivTm-K1l79HomYTqxDE';
    console.log(apiKey);
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey,
    })

    if (!isLoaded) {
        return <div>Loading map</div>;
    }
    */
    const getMap = async (lat, lng) => {//
        console.log("Center: ", { lat, lng });
        const cityMapUrl =
            "http://localhost:4000/api/citymap?center=";
        const response = await fetch(`${cityMapUrl}${lat},${lng}`);
        const data = await response.blob();
        console.log("blob type:", data);
        const imageUrl = URL.createObjectURL(data);
        console.log("Imageurl: ", imageUrl);
        setMapData(imageUrl);

    };

    useEffect(() => {
        getMap();
    }, []);

    const geoCode = async () => {
        console.log(city);
        const geoCodeServiceUrl =
            "http://localhost:4000/api/geolocation?address=";
        const response = await fetch(geoCodeServiceUrl + city);
        var dataGeo = await response.json();//await for response. store response in data
        console.log(dataGeo);
        setGeo(dataGeo);
        setLat(dataGeo.results[0].geometry.location.lat);
        setLng(dataGeo.results[0].geometry.location.lng);
        getMap(dataGeo.results[0].geometry.location.lat, dataGeo.results[0].geometry.location.lng);
    }

    const checkWeather = async () => {

        const weatherServiceUrl =
            "http://localhost:4000/api/weather?units=imperial&city=";
        const response = await fetch(weatherServiceUrl + city);//make request to server
        var dataWeather = await response.json();//await for response. store response in data 
        console.log(dataWeather);
        setWeather(dataWeather);
    }

    const handleChange = (e) => {
        e.preventDefault();
        setCity(e.target.value);
    };

    const handleSearch = () => {
        Promise.all([checkWeather(), geoCode()]);
    }

    return (

        <div id="container">
            <div className="search">

                <input
                    type="text"
                    id="cityInput"
                    placeholder="enter city name"
                    spellCheck="false"
                    value={city}
                    onChange={handleChange}
                />
                <button id="searchButton" onClick={handleSearch}>search</button>
            </div>

            <div className="weather">
                <h1 className="city">City: {weather.name && weather.name}</h1>
                <h2 className="temp">Temp: {weather.main && Math.round(weather.main.temp) + " F"}</h2>
                <h3 className="humidity">Humidity: {weather.main && weather.main.humidity + " % humidity"}</h3>
                <h4 className="wind">Wind: {weather.wind && weather.wind.speed + " mph"}</h4>
                <h5 className="feelsLike">Feels like: {weather.main && Math.round(weather.main.feels_like) + " F"}</h5>
                <h6 className="clouds">{weather.weather && weather.weather[0].main + " skies"}</h6>
            </div>

            <div className="location">
                <h1 className="lat">ln: {geo.results && geo.results[0].geometry.location.lng}</h1>
                <h2 className="lng">lat: {geo.results && geo.results[0].geometry.location.lat}</h2>
            </div>

            {/*
            <Flex
                position='relative'
                flexDirection='column'
                alignItems='center'
                bgColor='blue.200'
                h='100vh'
                w='100vw'
            >
                <Box position='absolute' left={0} top={0} h='100%' w='100%'></Box>

                <GoogleMap
                    center={center}
                    zoom={15}
                    mapContainerStyle={{ width: '50%', height: '50%' }}
                >

                </GoogleMap>
            </Flex>
            */}

            <img src={mapData} alt="Map" style={{ width: '100%', height: '100%' }} />

        </div>
    );
}
export default CityInfo;