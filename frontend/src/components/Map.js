import appProps from "../AppProps";
import {useEffect, useState} from "react";


function Map({city}) {
    const [mapUrl, setMapUrl] = useState();
    const getMapUrl = async () => {//
        const mapRequestUrl =
            `${appProps.backend}/api/map?city=${city}`;
        const response = await fetch(mapRequestUrl);
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
                <img src={mapUrl}/>
            </div>}
        </>
    )
}

export default Map;