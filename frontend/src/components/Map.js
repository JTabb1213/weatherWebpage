import { useEffect, useState } from "react";
import HttpClient from "../HttpClient";


function Map({ city }) {
    const [mapUrl, setMapUrl] = useState();
    const [error, setError] = useState();
    const getMapUrl = async () => {//
        HttpClient.get(`/api/map?city=${city}`).then(result => {
            setMapUrl(result.data.mapUrl);
        }).catch(err => {
            setError(err.response.data);
        })
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