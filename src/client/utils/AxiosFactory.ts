import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';

type ResponseType =
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "text"
    | "stream";

interface AxiosFactoryOptions {
    baseURL?: string;
    responseType?: ResponseType;
}

export class AxiosFactory {
    private baseURL: string = "";
    private responseType: ResponseType;
    private client: AxiosInstance;

    constructor(
        props: AxiosFactoryOptions = {
            baseURL: "http://localhost/",
            responseType: "json",
        }
    ) {
        this.baseURL = props.baseURL;
        this.responseType = props.responseType;

        this.client = Axios.create({
            baseURL: this.baseURL,
            responseType: this.responseType,
        });
    }

    useBearerToken(key: string = 'token') {

        this.client.interceptors.request.use(
            (config) => {
                const cookies = new Cookies();

                const token = cookies.get(key);

                if (token != null) {
                    config.headers.common["Authorization"] = "Bearer " + token;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        this.client.interceptors.response.use(
            (res: AxiosResponse<{ token: string }>) => {
                let token = res.headers["authorization"]?.slice(7);

                if (!!token) {
                    const cookies = new Cookies();
                    cookies.set(key, token, { path: "/" });
                }

                return res;
            },
            (error) => Promise.reject(error)
        );

        return this
    }

    before(fn: Function) {

        this.client.interceptors.request.use(
            (config) => {
                fn()
                return config;
            },
            (error) => Promise.reject(error)
        );

        return this;
    }

    after(fn: Function) {

        this.client.interceptors.response.use(
            (config) => {
                fn()
                return config;
            },
            (error) => Promise.reject(error)
        );

        return this;
    }

    getInstance(): AxiosInstance {
        return this.client;
    }

    getUseAxios(): AxiosInstance {
        const apiClient = Axios.create({
            baseURL: this.baseURL,
            responseType: this.responseType,
        });

        return apiClient;
    }
}
