import axios from "axios";

const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use(
    (config: any) => {
        const { data, params, query } = config;
        if (data) {
            config.data = data;
        }

        if (params) {
            config.params = params;
        }

        if (query) {
            const queryString = new URLSearchParams(query).toString();
            config.url += `?${queryString}`;
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            // Attach statusCode to the error
            error.code = error.response?.data?.code;
            error.message = error.response?.data?.message;
        }
        return Promise.reject(error);
        // throw new Error(error.response?.data?.message);
    },
);

export default axiosInstance;
