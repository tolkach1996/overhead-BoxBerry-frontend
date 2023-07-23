import axios from "axios";


const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Cache-control': 'no-cache',
    }
});

httpClient.interceptors.response.use(
    (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            return Promise.reject("error");
        }
    }
);

export default httpClient;
