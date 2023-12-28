import {useState} from 'react'
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
    const [input, setInput] = useState();
    const [city, setCity] = useState();
    const handleSearch = (e) => {
        e.preventDefault();
        setCity(input);
    };
    return (
        <div id="container">
            <div className="search">

                <input
                    type="text"
                    id="cityInput"
                    placeholder="enter city name"
                    spellCheck="false"
                    value={city}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button id="searchButton" onClick={handleSearch}>search</button>
            </div>
            {city &&
                <div>
                    <Weather city={city}/>
                    <Map city={city}/>
                </div>
            }
        </div>

    );
}

export default CityInfo;