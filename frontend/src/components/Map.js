import appProps from "../AppProps";
import { useEffect, useState } from "react";


function Map({ city, username, password }) {
    // console.log(username);
    // console.log(password);
    // console.log(city);
    const [mapUrl, setMapUrl] = useState();
    const [error, setError] = useState();
    const getMapUrl = async () => {//
        const mapRequestUrl =
            `${appProps.backend}/api/map?city=${city}`;
        const response = await fetch(mapRequestUrl, {
            headers: {
                'Authorization': `Basic ${btoa(username + ':' + password)}`
            }
        });
        const body = await response.json();
        response.ok ? setMapUrl(body.mapUrl) : setError(body);
    };

    useEffect(() => {
        if (city) {
            setMapUrl(null);
            setError(null);
            getMapUrl();
        }
    }, [city]);
    return (
        <>
            {mapUrl ? <div>
                <img src={mapUrl} />
            </div>
                :
                error &&
                <div className="error">
                    <h1>Could not fetch the map due to server error:</h1>
                    <h2>{error.message}</h2>
                </div>
            }
        </>
    )
}

export default Map;