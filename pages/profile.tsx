import * as React from 'react';
import { HomePage } from 'src/client/containers/home/HomePage';
import { NextPage, NextPageContext } from 'next';
import { useDispatch } from 'react-redux';
import Layout from 'src/client/containers/layout/Layout';
import PageInitialUtil from 'src/client/utils/PageInitialUtil';

export interface HomeIndexProps {
    title: string;
}

export const ProfileIndex: NextPage<HomeIndexProps> = (props) => {
    const dispatch = useDispatch();

    PageInitialUtil.initPageInfo(dispatch);
    PageInitialUtil.initPageLayoutWithUser(dispatch);
    PageInitialUtil.initUserInfo(dispatch);
    return (
        <React.Fragment>
            <Layout {...props}>
                <HomePage {...props} />
            </Layout>
        </React.Fragment>
    );
};

ProfileIndex.getInitialProps = async (ctx: NextPageContext) => {
    return {
        title: 'Profile',
    };
};

export default ProfileIndex;
