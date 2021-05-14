import axios from 'axios';

const axiosProd = axios.create({
    baseURL: 'https://www.progressapp.com/server/api.php/records'
});

const axiosDev = axios.create({
    baseURL: 'http://127.0.0.1:8080/progress-app/server/api.php/records'
});

export const axiosObject = process.env.NODE_ENV === 'development' ? axiosDev : axiosProd;