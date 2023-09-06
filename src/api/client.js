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
    },
    (error) => {
        const res = error.response;
        
        /* if (res.status === 401) {
            const store = useAuthStore();
            store.logout();
        } */

        if (res?.data) {
            throw res.data;
        }
        
        throw error;
    }
);

export default httpClient;
