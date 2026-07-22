import axios from "axios";
import { toast } from "sonner";

const API = axios.create({

    baseURL: "http://127.0.0.1:5000"

});

API.interceptors.request.use(

    (config) => {

        const token = localStorage.getItem("access_token");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => Promise.reject(error)

);

API.interceptors.response.use(

    (response) => response,

    (error) => {

        if (!error.response) {

            toast.error("Network Error");

        }

        else if (error.response.status === 401) {

            toast.error("Session Expired");

            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");

            window.location.href = "/login";

        }

        else if (error.response.status === 403) {

            toast.error("Access Denied");

        }

        else if (error.response.status === 404) {

            toast.error("Resource Not Found");

        }

        else if (error.response.status >= 500) {

            toast.error("Internal Server Error");

        }

        return Promise.reject(error);

    }

);

export default API;