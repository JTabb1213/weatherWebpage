import { useState, useRef, useEffect } from 'react'
import './CityInfo.css'
import Weather from "./Weather";
import Map from "./Map";
import { useSearchParams } from "react-router-dom";


function CityInfo() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [city, setCity] = useState(searchParams.get("city") || "");
    const [cityInput, setCityInput] = useState(searchParams.get("city") || "");
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams(params => {
            params.set("city", cityInput);
            return params;
        })
        setCity(cityInput);
    };
    return (
        <div id="container">
            <div className="search">
                <input
                    type="text"
                    id="cityInput"
                    placeholder="enter city name"
                    spellCheck="false"
                    value={cityInput}
                    onChange={e => setCityInput(e.currentTarget.value)}
                />
                <button id="searchButton" onClick={handleSearch}>search</button>
            </div>
            <Weather city={city} />
            <Map city={city} />
        </div>

    );
}

export default CityInfo;