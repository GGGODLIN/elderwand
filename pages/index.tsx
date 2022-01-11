import { NextPage, NextPageContext } from 'next';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import LoginPage from 'src/client/containers/auth/LoginPage';
import Layout from 'src/client/containers/layout/Layout';
import InitSlice, { InitialPayload } from 'src/client/slices/InitSlice';
import LayoutSlice, { LayoutPayload } from 'src/client/slices/LayoutSlice';

export interface HomeIndexProps {
    title: string;
}

export const HomeIndex: NextPage<HomeIndexProps> = (props) => {
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

HomeIndex.getInitialProps = async (ctx: NextPageContext) => {
    const { query } = ctx;
    return {
        title: 'Home',
        query: query,
    };
};

export default HomeIndex;
