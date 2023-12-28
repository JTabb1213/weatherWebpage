import {useEffect, useState} from "react";
import appProps from "../AppProps";

function Weather({city}) {
    const [weather, setWeather] = useState();
    const getWeather = async () => {//
        const weatherRequestUrl =
            `${appProps.backend}/api/weather?units=imperial&city=${city}`;
        const response = await fetch(weatherRequestUrl);//make request to server
        var dataWeather = await response.json();//await for response. store response in data
        setWeather(dataWeather);
    };

    useEffect(() => {
        getWeather();
    }, [city]);
    return (
        <>
            {weather &&
                <div className="weather">
                    <h1 className="city">City: {weather.name && weather.name}</h1>
                    <h2 className="temp">Temp: {weather.main && Math.round(weather.main.temp) + " F"}</h2>
                    <h3 className="humidity">Humidity: {weather.main && weather.main.humidity + " % humidity"}</h3>
                    <h4 className="wind">Wind: {weather.wind && weather.wind.speed + " mph"}</h4>
                    <h5 className="feelsLike">Feels
                        like: {weather.main && Math.round(weather.main.feels_like) + " F"}</h5>
                    <h6 className="clouds">{weather.weather && weather.weather[0].main + " skies"}</h6>
                </div>}
        </>
    )
}

export default Weather;