import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from "./pages/Home";
import Login from "./pages/Login";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import {BrowserRouter, Outlet, Route, Routes, useNavigate, useSearchParams} from "react-router-dom";
import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {useHttpClient} from "./HttpClient";

function AppLayout() {
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

    return <div>
        <AppBar component="nav">
            <Toolbar>
                <IconButton
                    color="inherit"
                >
                 <ThunderstormIcon/>
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Jack's Big Gay Weather App
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    <Button onClick={handleLogout} sx={{ color: '#fff' }}>
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
        <div className="content">
        <Outlet/>
        </div>

    </div>
}


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);


