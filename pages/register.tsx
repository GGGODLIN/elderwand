import Layout from 'src/client/containers/layout/Layout';
import LayoutSlice, { LayoutPayload } from 'src/client/slices/LayoutSlice';
import React, { useEffect } from 'react';
import { InitialPayload, InitSlice } from 'src/client/slices/InitSlice';
import { NextPage, NextPageContext } from 'next';
import { RegisterPage } from 'src/client/containers/auth/RegisterPage';
import { useDispatch } from 'react-redux';

export interface RegisterIndexProps {
    title: string;
    query: any;
}

export const RegisterIndex: NextPage<RegisterIndexProps> = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const page: InitialPayload = {
            name: 'register',
        };
        dispatch(InitSlice.actions.initial(page));

        const layout: LayoutPayload = {
            feature_drawer: { display: false },
        };
        dispatch(LayoutSlice.initial(layout));
    }, []);

    return (
        <React.Fragment>
            <Layout {...props}>
                <RegisterPage {...props} />
            </Layout>
        </React.Fragment>
    );
};

RegisterIndex.getInitialProps = async (ctx: NextPageContext) => {
    const { query } = ctx;

    return {
        title: 'register',
        query: query,
    };
};

export default RegisterIndex;
