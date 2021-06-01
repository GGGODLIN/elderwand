import Axios, { AxiosInstance, ResponseType } from 'axios';

interface RequestParams {
    baseURL?: string;
    responseType?: string;
}

export default class AxiosFactory {
    constructor(
        params: RequestParams = {
            baseURL: 'localhost',
            responseType: 'json',
        }
    ) {
        let baseURL = params.baseURL;
        let responseType = params.responseType as ResponseType;

        if (params.baseURL != null) {
            baseURL = 'http://' + `${baseURL}`;
        }

        this.instance = Axios.create({
            baseURL: baseURL,
            responseType: responseType,
        });
    }

    private readonly instance: AxiosInstance;

    getInstance(): AxiosInstance {
        return this.instance;
    }
}
