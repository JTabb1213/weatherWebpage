import React from "react";
import { useState } from 'react';
import { useRef } from 'react';
import CityInfo from "../components/CityInfo";
import appProps from "../AppProps";
import '../App.css';

export default function Home() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const usernameInput = useRef();
    const passwordInput = useRef();

    const setLoginInfo = (e) => {
        e.preventDefault();
        setUsername(usernameInput.current.value);
        setPassword(passwordInput.current.value);
        console.log("Current: ", passwordInput.current.value);
        handleLogin();
    }

    const handleLogin = async () => {
        //e.preventDefault();
        //setUsername(usernameInput.current.value)
        //setPassword(passwordInput.current.value)
        console.log("THIS is: ", password);
        const weatherRequestUrl =
            `${appProps.backend}/api/map?city=chicago`;
        const response = await fetch(weatherRequestUrl, {
            headers: {
                'Authorization': `Basic ${btoa(usernameInput.current.value + ':' + passwordInput.current.value)}`
            }
        });

        if (response.ok) {
            console.log("login successful");
            setLoggedIn(true);
        }
        else {
            console.log("error");
        }
    }

    return (

        <div className="container">
            {!loggedIn && (
                <div className="box">
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

                    <button id="loginButton" onClick={setLoginInfo}>login</button>
                </div>
            )}

            {loggedIn && (
                <div className="box">
                    <CityInfo username={username} password={password} />
                </div>
            )}
        </div>
    );
}
