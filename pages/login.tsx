import { NextPage, NextPageContext } from 'next';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LoginPage from 'src/client/containers/auth/LoginPage';
import Layout from 'src/client/containers/layout/Layout';
import InitSlice, { InitialPayload } from 'src/client/slices/InitSlice';
import LayoutSlice, { LayoutPayload } from 'src/client/slices/LayoutSlice';

export interface LoginIndexProps {
    title: string;
}

export const LoginIndex: NextPage<LoginIndexProps> = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const page: InitialPayload = {
            name: 'login',
        };
        dispatch(InitSlice.initial(page));

        const layout: LayoutPayload = {
            feature_drawer: { display: false },
        };

        dispatch(LayoutSlice.initial(layout));
    }, []);

    return (
        <React.Fragment>
            <Layout {...props}>
                <LoginPage {...props} />
            </Layout>
        </React.Fragment>
    );
};

LoginIndex.getInitialProps = async (ctx: NextPageContext) => {
    const { query } = ctx;
    return {
        title: 'Login',
        query: query,
    };
};

export default LoginIndex;
