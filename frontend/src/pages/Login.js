import {Alert, Box, Button, Grid, TextField} from "@mui/material";
import {useState} from "react";
import styles from '../css/login.module.css';
import {useHttpClient} from "../HttpClient";
import {useNavigate, useSearchParams} from "react-router-dom";

export default function Login() {
    const httpClient = useHttpClient();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState();

    const onButtonClick = () => {
        httpClient.post('/api/login', {
            username: username,
            password: password
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(result => {
            const originalUrl = searchParams.get('original_url') || '/';
            navigate(originalUrl);
        }).catch(err => {
            setError(err.response.data.message);
        })
    }

    const onCreateUser = () => {
        httpClient.post('/api/createUser', {
            username: username,
            password: password
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(result => {
            if (result.data === 'user not added') {
                console.log('User not created');
            } else {
                console.log('user created');
            }
        }).catch(err => {
            console.error('Error: ', err.message);
        });
    }

    return <div className={styles.mainContainer}>
        <Box sx={{width: { xs: "75%", md: '30%' }}}>
            <Grid container
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}>
                <Grid item align="center"
                      xs={12}>
                    <img src="/lock.png"/>
                </Grid>
                <Grid item xs={12} align="center">
                    <div className={styles.title}>Sign in</div>
                </Grid>

                {error && <Grid item xs={12}>
                    <Alert severity="error">{error}</Alert>
                </Grid>}

                <Grid item xs={12}>
                    <TextField fullWidth defaultValue={username}
                               onChange={ev => setUsername(ev.target.value)}
                               label="Username" variant="outlined" onChange={ev => setUsername(ev.target.value)}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth defaultValue={password}
                               onChange={ev => setPassword(ev.target.value)}
                               label="Password" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" onClick={onButtonClick}>SIGN IN</Button>
                </Grid>
                <Grid container item xs={12} direction="row">
                    <Grid item xs={12} md={6} align="start">
                        <a onClick={() => alert('TODO: Need to handle forgot password')}>Forgot password?</a>
                    </Grid>
                    <Grid item xs={12} md={6} align="end">
                        <a onClick={onCreateUser}>Don't have an account? Sign Up</a>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    </div>


}