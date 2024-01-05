import {useEffect, useState} from "react";
import {useHttpClient} from "../HttpClient";
import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import Progress from "./Progress";


function Weather({city}) {
    const [weather, setWeather] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const httpClient = useHttpClient();
    const getWeather = async () => {
        httpClient.get(`/api/weather?units=imperial&city=${city}`).then(result => {
           setWeather(result.data);
        }).catch(err => {
            setError(err.response.data);
        }).finally(() => {
           setLoading(false);
        })
    };

    useEffect(() => {
        if (city) {
            setWeather(null);
            setError(null);
            setLoading(true);
            getWeather();
        }
    }, [city]);
    return (
        <>
            {!loading && weather &&
                <div className="weather" style={{padding: '80px'}}>
                    <h1 className="city">City: {weather.name && weather.name}</h1>
                    <h2 className="temp">Temp: {weather.main && Math.round(weather.main.temp) + " F"}</h2>
                    <h3 className="humidity">Humidity: {weather.main && weather.main.humidity + " % humidity"}</h3>
                    <h4 className="wind">Wind: {weather.wind && weather.wind.speed + " mph"}</h4>
                    <h5 className="feelsLike">Feels
                        like: {weather.main && Math.round(weather.main.feels_like) + " F"}</h5>
                    <h6 className="clouds">{weather.weather && weather.weather[0].main + " skies"}</h6>
                </div>}
            {error &&
                <div className="error">
                    <h1>Could not fetch the weather due to server error:</h1>
                    <h2>{error.message}</h2>
                </div>}
            {loading && !weather &&
                <Progress title="Fetching weather..."/>}
        </>
    )
}

export default Weather;