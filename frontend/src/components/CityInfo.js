import {useEffect, useState} from 'react'
import Weather from "./Weather";
import Map from "./Map";
import {useSearchParams} from "react-router-dom";
import {Button, Grid, Paper, TextField} from "@mui/material";


function CityInfo() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [city, setCity] = useState();
    const [cityInput, setCityInput] = useState();

    useEffect(() => {
        const cityFromSearch = searchParams.get("city");
        setCity(cityFromSearch);
        setCityInput(cityFromSearch || "");
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams(params => {
            params.set("city", cityInput);
            return params;
        })
        setCity(cityInput);
    };
    return (
        <div id="container">
            <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                <Grid item container align="center" spacing={1} justifyContent="center">
                    <Grid item>
                    <TextField
                        sx={{backgroundColor: '#fff'}}
                        variant="outlined"
                        label="City"
                        value={cityInput}
                        onChange={e => setCityInput(e.currentTarget.value)}
                    />
                    </Grid>
                    <Grid item sx={{display: 'flex', alignItems: 'center'}}>
                        <Button fullWidth variant="contained" onClick={handleSearch}>Search</Button>
                    </Grid>
                </Grid>
                {city && <Grid item sx={{marginTop: '100px'}} >
                    <Paper elevation={1}>
                        <Grid item container alignItems="center" justifyContent="center" spacing={5} xs={12}>
                        <Grid item container sx={{paddingTop: '0px !important', minHeight: '400px', minWidth: '400px'}} xs={6}>
                            <Weather city={city} />
                        </Grid>
                        <Grid item container sx={{paddingTop: '0px !important', minHeight: '400px', minWidth: '400px'}} xs={6}>
                            <Map city={city} />
                        </Grid>
                        </Grid>
                    </Paper>
                </Grid>}

            </Grid>



        </div>
    );
}

export default CityInfo;