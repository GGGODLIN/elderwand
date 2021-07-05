import Axios, { AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'universal-cookie';

interface AxiosFactoryCtor {
    baseURL?: string;
    responseType?: string;
    timeout?: number;
}

type ResponseType =
    | 'arraybuffer'
    | 'blob'
    | 'document'
    | 'json'
    | 'text'
    | 'stream';

export class AxiosHelper {
    static getOriginWithPort = () => {
        if (!document) {
            return '';
        }

        const origin = document.location.origin;

        const regex = new RegExp(/:\d+$/);

        if (regex.test(origin)) {
            return origin;
        }

        const port = document.location.port;

        return port ? `${origin}:${port}` : origin;
    };
}

export default class AxiosFactory {
    constructor(
        ctor: AxiosFactoryCtor = {
            baseURL: '',
            responseType: 'json',
        }
    ) {
        // console.log(ctor);
        let responseType = (ctor.responseType || 'json') as ResponseType;
        let baseURL = ctor.baseURL || '';

        if (ctor.baseURL == '') {
            baseURL = AxiosHelper.getOriginWithPort();
        }

        if (ctor.baseURL != '' && ctor.baseURL.indexOf('http') < 0) {
            baseURL = `${location.protocol}//${baseURL}`;
        }

        this.instance = Axios.create({
            baseURL: baseURL,
            responseType: responseType,
            timeout: ctor.timeout,
        });
    }

    private readonly instance: AxiosInstance;

    useHeader(key: string, value: string) {
        this.instance.interceptors.request.use(
            (config) => {
                config.headers.common[key] = value;
                return config;
            },
            (error) => Promise.reject(error)
        );

        return this;
    }

    useBearerToken(key: string = 'token') {
        this.instance.interceptors.request.use(
            (config) => {
                const cookies = new Cookies();

                const token = cookies.get(key);

                if (token != null) {
                    config.headers.common['Authorization'] = 'Bearer ' + token;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        this.instance.interceptors.response.use(
            (res: AxiosResponse<{ token: string }>) => {
                let token = res.headers['authorization']?.slice(7);

                if (!!token) {
                    const cookies = new Cookies();
                    // const age = 24 * 60 * 60 * 1000;
                    cookies.set(key, token, {
                        path: '/',
                        // maxAge: age,
                    });
                }

                return res;
            },
            (error) => Promise.reject(error)
        );

        return this;
    }

    useBefore(fn: Function) {
        this.instance.interceptors.request.use(
            (config) => {
                fn();
                return config;
            },
            (error) => Promise.reject(error)
        );
        return this;
    }

    getInstance(): AxiosInstance {
        return this.instance;
    }
}
