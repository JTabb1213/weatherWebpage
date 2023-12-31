import axios from "axios";
import AppProps from "./AppProps";

const axiosInstance = axios.create({
    baseURL: AppProps.backend,
    withCredentials: true,
    headers: {
        Accept: "application/json",
    },
});

axiosInstance.interceptors.response.use(
    response => {

        return response
    },
    function (error) {
        if (error.response.status === 401) {
            window.location.href = `login?original_url=${window.location.href}`;
        }
        return Promise.reject(error);
    }
)
export default axiosInstance;