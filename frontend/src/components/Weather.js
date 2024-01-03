import { useEffect, useState } from "react";
import HttpClient from "../HttpClient";

function Weather({ city }) {
    const [weather, setWeather] = useState();
    const [error, setError] = useState();
    const getWeather = async () => {//
        HttpClient.get(`/api/weather?units=imperial&city=${city}`).then(result => {
            setWeather(result.data);
        }).catch(err => {
            setError(err.response.data);
        })
    };

    useEffect(() => {
        if (city) {
            setWeather(null);
            setError(null);
            getWeather();
        }
    }, [city]);
    return (
        <>
            {weather ?
                <div className="weather">
                    <h1 className="city">City: {weather.name && weather.name}</h1>
                    <h2 className="temp">Temp: {weather.main && Math.round(weather.main.temp) + " F"}</h2>
                    <h3 className="humidity">Humidity: {weather.main && weather.main.humidity + " % humidity"}</h3>
                    <h4 className="wind">Wind: {weather.wind && weather.wind.speed + " mph"}</h4>
                    <h5 className="feelsLike">Feels
                        like: {weather.main && Math.round(weather.main.feels_like) + " F"}</h5>
                    <h6 className="clouds">{weather.weather && weather.weather[0].main + " skies"}</h6>
                </div> :
                error &&
                <div className="error">
                    <h1>Could not fetch the weather due to server error:</h1>
                    <h2>{error.message}</h2>
                </div>
            }
        </>
    )
}

export default Weather;