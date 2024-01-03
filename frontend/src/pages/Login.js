import {Button} from "@mui/material";
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
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const onButtonClick = () => {
        httpClient.post('/api/login', {
            username: username,
            password: password
        },{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(result => {
            const originalUrl = searchParams.get('original_url') || '/';
            navigate(originalUrl);
        }).catch(err => {
            setEmailError(err.response.data.message);
            setPasswordError(err.response.data.message)
        })
    }

    return <div className={styles.mainContainer}>
        <div className={styles.titleContainer}>
            <div>Login</div>
        </div>
        <br />
        <div className={styles.inputContainer}>
            <input
                value={username}
                placeholder="Username"
                onChange={ev => setUsername(ev.target.value)}
                className={styles.inputBox} />
            <label className={styles.errorLabel}>{emailError}</label>
        </div>
        <br />
        <div className={styles.inputContainer}>
            <input
                value={password}
                placeholder="Password"
                onChange={ev => setPassword(ev.target.value)}
                className={styles.inputBox} />
            <label className={styles.errorLabel}>{passwordError}</label>
        </div>
        <br />
        <div className={styles.inputContainer}>
            <input
                className={styles.inputButton}
                type="button"
                onClick={onButtonClick}
                value={"Log in"} />
        </div>
    </div>


}