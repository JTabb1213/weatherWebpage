import {Alert, Box, Button, CircularProgress, Container, Grid, Paper, TextField} from "@mui/material";
import {useState} from "react";
import styles from '../css/login.module.css';
import {useHttpClient} from "../HttpClient";
import {useNavigate, useSearchParams} from "react-router-dom";
import { green } from '@mui/material/colors';

export default function Login() {
    const httpClient = useHttpClient();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState();
    const [working, setWorking] = useState();
    const onButtonClick = () => {
        setError(null);
        setWorking(true);
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
        }).finally(() => {
            setWorking(false);
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

    return <div>
        <Container sx={{width: { xs: "90%", sm: '60%', md: '60%', lg: '50%', xl: '35%' }, marginTop: '200px'}}>
        <Paper elevation={5} sx={{padding: '40px'}}>
            <Grid container
                  alignItems="center"
                  justifyContent="center"
                  spacing={2}>

                <Grid item align="center"
                      xs={12}>
                    <Box sx={{ m: 1, position: 'relative' }}>
                    <img src="/lock.png"/>
                    {working && (
                        <CircularProgress
                            size={50}
                            sx={{
                                color: green[500],
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: '-26px',
                                marginLeft: '-25px',
                                zIndex: 1,
                            }}
                        />
                    )}
                    </Box>
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
                               type="password"
                               onChange={ev => setPassword(ev.target.value)}
                               label="Password" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" onClick={onButtonClick}>SIGN IN</Button>
                </Grid>
                <Grid container item xs={12} direction="row" spacing={1}>
                    <Grid item xs={12} md={6} container justifyContent="start">
                        <a onClick={() => alert('TODO: Need to handle forgot password')}>Forgot password?</a>
                    </Grid>
                    <Grid item container xs={12} md={6} justifyContent={{lg: 'end', md: 'end', sm: 'start', xs: 'start'}}>
                        <a sx={{textWrap: 'nowrap'}} onClick={onCreateUser}>Don't have an account? Sign Up</a>
                    </Grid>
                </Grid>

            </Grid>
        </Paper>
        </Container>

    </div>


}