import router from "@/router";
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const service = Axios.create({
    baseURL: `${process.env.VUE_APP_API_PATH}`,
    timeout: 10000
});

/**
 * 請求攔截器
 */
service.interceptors.request.use(async (config: AxiosRequestConfig) => {

    return config;
});

/**
 * 回應攔截器
 */
service.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error?.response?.status === 401) {
            if (router.currentRoute.value.path !== '/login') {
                router.push({ name: "Login" });
            }
        }

        if (error.response) {
            switch (error.response.status) {
                case 404:
                    console.log("404");
                    // go to 404 page
                    break
                case 500:
                    console.log("500");
                    // go to 500 page
                    break
                default:
                    console.log(error.message);
            }
        }

        return Promise.reject(error);
    }
)

export default service;