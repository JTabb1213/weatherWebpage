import React, { useState, useRef, useEffect } from 'react'
import './CityInfo.css'
import Weather from "./Weather";
import Map from "./Map";
import { useNavigate } from 'react-router-dom'

function CityInfo() {
    const [city, setCity] = useState();
    const cityInput = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const originalCity = urlParams.get('city');
        setCity(originalCity);
    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        setCity(cityInput.current.value);
        navigate(`?city=${cityInput.current.value}`);
    }

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
            <Weather city={city} />
            <Map city={city} />
        </div>

    );
}

export default CityInfo;