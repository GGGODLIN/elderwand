import * as React from 'react';
import { HomePage } from 'src/client/containers/home/HomePage';
import { NextPage, NextPageContext } from 'next';
import Layout from 'src/client/containers/layout/Layout';

export interface HomeIndexProps {
    title: string;
}

export const HomeIndex: NextPage<HomeIndexProps> = (props) => {
    return (
        <React.Fragment>
            <Layout {...props}>
                <HomePage {...props} />
            </Layout>
        </React.Fragment>
    );
};

HomeIndex.getInitialProps = async (ctx: NextPageContext) => {
    return {
        title: 'Home',
    };
};

export default HomeIndex;
