import React from "react";
import CityInfo from "../components/CityInfo";
import '../App.css';
import {useHttpClient} from "../HttpClient";
import {useNavigate, useSearchParams} from "react-router-dom";


export default function Home() {
    const httpClient = useHttpClient();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const handleLogout = () => {
        httpClient.post('/api/logout', {
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(result => {
            //const originalUrl = searchParams.get('original_url') || '/';
            navigate('');
        }).catch(err => {
            console.error("logout failed", err)
        })
    }

    return (
        <div>
            <CityInfo />
        </div>
    );
}
