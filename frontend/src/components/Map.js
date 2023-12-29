import appProps from "../AppProps";
import { useEffect, useState } from "react";


function Map({ city, username, password }) {
    console.log(username);
    console.log(password);
    console.log(city);
    const [mapUrl, setMapUrl] = useState();
    const getMapUrl = async () => {//
        const mapRequestUrl =
            `${appProps.backend}/api/map?city=${city}`;
        const response = await fetch(mapRequestUrl, {
            //credentials: 'include',
            headers: {
                // 'Authorization': 'Basic ' + btoa('admin:supersecret')
                'Authorization': `Basic ${btoa(username + ':' + password)}`
            }
        });
        //console.log(mapRequestUrl);
        const body = await response.json();
        setMapUrl(body.mapUrl);
    };

    useEffect(() => {
        if (city) {
            getMapUrl();
        }
    }, [city]);
    return (
        <>
            {mapUrl && <div>
                <img src={mapUrl} />
            </div>}
        </>
    )
}

export default Map;