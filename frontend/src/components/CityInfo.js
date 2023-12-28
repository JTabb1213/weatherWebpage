import {useState, useRef} from 'react'
import {
    Box,
    Flex,
} from '@chakra-ui/react'

import {useJsApiLoader, GoogleMap} from '@react-google-maps/api';
import './CityInfo.css'
import React, {useEffect} from 'react';
import Weather from "./Weather";
import Map from "./Map";


function CityInfo() {
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
            <Weather city={city}/>
            <Map city={city}/>
        </div>

    );
}

export default CityInfo;