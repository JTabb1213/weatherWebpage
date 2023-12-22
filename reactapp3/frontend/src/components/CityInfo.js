import { useState } from 'react'
import './CityInfo.css';

function CityInfo() {
    const [city, setCity] = useState("");
    const [geo, setGeo] = useState([]);
    const [weather, setWeather] = useState([]);

    const geoCode = async () => {
        console.log(city);
        const geoCodeServiceUrl =
            window.location.origin + "/api/geolocation?address=";
        const response = await fetch(geoCodeServiceUrl + city);
        var dataGeo = await response.json();//await for response. store response in data
        console.log(dataGeo);
        setGeo(dataGeo);
    }

    const checkWeather = async () => {

        const weatherServiceUrl =
            window.location.origin + "/api/weather?units=imperial&city=";
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
        </div >
    );
}
export default CityInfo;