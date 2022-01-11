import Layout from 'src/client/containers/layout/Layout';
import LayoutSlice, { LayoutPayload } from 'src/client/slices/LayoutSlice';
import React, { useEffect } from 'react';
import UserMaintainPage from 'src/client/containers/user/UserMaintainPage';
import UserSlice from 'src/client/slices/UserSlice';
import { AxiosError } from 'axios';
import { AxiosUtil } from 'src/client/utils/AxiosUtil';
import { InitialPayload, InitSlice } from 'src/client/slices/InitSlice';
import { NextPage, NextPageContext } from 'next';
import { useDispatch } from 'react-redux';
import PageInitialUtil from 'src/client/utils/PageInitialUtil';

export interface UserIndexProps {
    title: string;
}

export const UserIndex: NextPage<UserIndexProps> = (props) => {
    const dispatch = useDispatch();

    PageInitialUtil.initPageInfo(dispatch);
    PageInitialUtil.initPageLayoutWithUser(dispatch);
    PageInitialUtil.initUserInfo(dispatch);

    useEffect(() => {
        const page: InitialPayload = {
            name: 'user',
        };
        dispatch(InitSlice.actions.initial(page));

        const layout: LayoutPayload = {
            feature_drawer: { display: true },
            profile_drawer: { display: true },
            goto_top: { display: true },
        };

        dispatch(LayoutSlice.initial(layout));
    }, []);

    // useEffect(() => {
    //     const origin = AxiosUtil.getOriginWithPort();

    //     const client = AxiosUtil.makeAxiosInstance(dispatch, origin);

    //     client
    //         .get('/api/user/me')
    //         .then((res) => {
    //             if (res.status == 200) {
    //                 dispatch(UserSlice.initial(res.data));
    //                 return;
    //             }
    //         })
    //         .catch((err: AxiosError) => {
    //             console.log(err.response.status);
    //             console.log(err.message);
    //             document.location.replace('/logout');
    //         });
    // }, []);

    return (
        <React.Fragment>
            <Layout {...props}>
                <UserMaintainPage {...props} />
            </Layout>
        </React.Fragment>
    );
};

UserIndex.getInitialProps = async (ctx: NextPageContext) => {
    return {
        title: 'User',
    };
};

export default UserIndex;
