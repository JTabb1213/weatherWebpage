import { useState, useRef } from 'react'
import './CityInfo.css'
import Weather from "./Weather";
import Map from "./Map";


function CityInfo({ username, password }) {
    //console.log(password);
    //console.log(username);
    const [city, setCity] = useState();
    const cityInput = useRef();

    const handleSearch = (e) => {
        e.preventDefault();
        setCity(cityInput.current.value);
    };

    return (
        <div id="container">
            <div className="search">
                <input
                    ref={cityInput}
                    type="text"
                    id="cityInput"
                    placeholder="enter city name"
                    spellCheck="false"
                />
                <button id="searchButton" onClick={handleSearch}>search</button>
            </div>
            <Weather city={city} username={username} password={password} />
            <Map city={city} username={username} password={password} />
        </div>

    );
}

export default CityInfo;