import axios from "axios";
import AppProps from "./AppProps";
import {useLocation, useNavigate} from "react-router-dom";

export const useHttpClient = () => {
    const navigate = useNavigate();
    const location = useLocation();
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
            const currentPathname = window.location.pathname;
            if (error.response.status === 401 && currentPathname !== '/login') {
                navigate({
                    pathname: '/login',
                    search: `redirect_url=${location.pathname}${location.search}`,
                })
            }
            return Promise.reject(error);
        }
    )
    return axiosInstance;
}