import {useEffect, useState} from "react";
import {useHttpClient} from "../HttpClient";
import Progress from "./Progress";


function Map({city}) {
    const [mapUrl, setMapUrl] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const httpClient = useHttpClient();
    const getMapUrl = async () => {//
        httpClient.get(`/api/map?city=${city}`).then(result => {
            setMapUrl(result.data.mapUrl);
        }).catch(err => {
            setError(err.response.data);
        }).finally(() => {
            setLoading(false);
        })
    };

    useEffect(() => {
        if (city) {
            setMapUrl(null);
            setError(null);
            setLoading(true);
            getMapUrl();
        }
    }, [city]);
    return (
        <>
            {!loading && mapUrl && <div>
                <img src={mapUrl}/>
            </div>}
            {loading && !mapUrl && <Progress title="Fetching map..."/>}
            {error && <div className="error">
                <h1>Could not fetch the map due to server error:</h1>
                <h2>{error.message}</h2>
            </div>}
        </>
    )
}

export default Map;