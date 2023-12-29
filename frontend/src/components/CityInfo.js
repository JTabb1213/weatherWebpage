import { useState, useRef } from 'react'
import {
    Box,
    Flex,
} from '@chakra-ui/react'

import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import './CityInfo.css'
import React, { useEffect } from 'react';
import Weather from "./Weather";
import Map from "./Map";


function CityInfo() {
    const [city, setCity] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const cityInput = useRef();
    const usernameInput = useRef();
    const passwordInput = useRef();

    const handleSearch = (e) => {
        e.preventDefault();
        setCity(cityInput.current.value);
        setUsername(usernameInput.current.value)
        setPassword(passwordInput.current.value)
    };

    return (
        <div id="container">
            <div className="search">

                <input
                    ref={usernameInput}
                    type="text"
                    id="usernameInput"
                    placeholder='enter username'
                    spellCheck='false'
                />

                <input
                    ref={passwordInput}
                    type="text"
                    id="passwordInput"
                    placeholder='enter username'
                    spellCheck='false'
                />

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