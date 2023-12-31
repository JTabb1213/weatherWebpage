import {Button} from "@mui/material";
import {useState} from "react";
import styles from '../css/login.module.css';
import HttpClient from "../HttpClient";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const onButtonClick = () => {
        HttpClient.post('/api/login', {
            username: username,
            password: password
        },{
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(result => {
            // Redirect back to the original url
            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);
            const originalUrl = urlParams.get('original_url') || '/';
            window.location.href = originalUrl;
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