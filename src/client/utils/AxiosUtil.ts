import FetchSlice from 'src/client/slices/FetchSlice';
import { AxiosError, AxiosInstance } from 'axios';
import { AxiosFactory } from 'src/client/utils/AxiosFactory';
import { Dispatch } from 'react';

export class AxiosUtil {

    static makeAxiosInstance = (dispatch: Dispatch<any>, baseURL: string): AxiosInstance => {

        const client = new AxiosFactory({ baseURL: baseURL })
            .useBearerToken()
            .before(() => {
                dispatch(FetchSlice.start());
            })
            .after(() => {
                dispatch(FetchSlice.end());
            })
            .getInstance();

        return client;
    }

    static redirectUnAuthorization = (err: AxiosError) => {
        if (err.isAxiosError && err.response.status == 401) {
            location.replace("/logout");
        }
    }
}

export interface PaginationParams {
    limit: number;
    offset: number;
}
