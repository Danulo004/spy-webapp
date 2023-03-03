import axios from 'axios';
import config from '../config/config';

const API = axios.create({
    baseURL: config.apiHost
});

API.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error);
        return Promise.reject(error);
    }
);
export default API;
