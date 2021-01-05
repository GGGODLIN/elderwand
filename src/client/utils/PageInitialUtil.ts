import InitSlice, { InitialPayload } from '../slices/InitSlice';
import LayoutSlice, { LayoutPayload } from '../slices/LayoutSlice';
import UserSlice from '../slices/UserSlice';
import { AxiosError } from 'axios';
import { AxiosUtil } from './AxiosUtil';
import { Dispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';

export class PageInitialUtil {

    static initPageLayoutWithUser(dispatch: Dispatch<any>) {
        useEffect(() => {
            const layout: LayoutPayload = {
                feature_drawer: { display: true },
                profile_drawer: { display: true },
                goto_top: { display: true },
            };

            dispatch(LayoutSlice.initial(layout));
        }, []);
    }

    static initPageInfo(dispatch: Dispatch<any>) {
        useEffect(() => {
            const page: InitialPayload = {
                name: "admin",
            };
            dispatch(InitSlice.initial(page));
        }, []);
    }

    static initUserInfo(dispatch: Dispatch<any>) {
        useEffect(() => {
            const origin = AxiosUtil.getOriginWithPort();
            const client = AxiosUtil.makeAxiosInstance(dispatch, origin);

            client
                .get("/api/user/me")
                .then((res) => {
                    if (res.status == 200) {
                        dispatch(UserSlice.initial(res.data));
                        return;
                    }
                })
                .catch((err: AxiosError) => {
                    console.log(err.response.status);
                    console.log(err.message);
                    document.location.replace("/logout");
                });
        }, []);
    }

}
