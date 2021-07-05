import { NextPage } from 'next';
import React from 'react';
import { useDispatch } from 'react-redux';
import Layout from 'src/client/containers/layout/Layout';
import SpacePage from 'src/client/containers/space/SpacePage';
import PageInitialUtil from 'src/client/utils/PageInitialUtil';

interface SpaceIndexProps {
    title: string;
}

export const SpaceIndex: NextPage<SpaceIndexProps> = (props) => {
    const dispatch = useDispatch();

    PageInitialUtil.initPageInfo(dispatch);
    PageInitialUtil.initPageLayoutWithUser(dispatch);
    PageInitialUtil.initUserInfo(dispatch);

    return (
        <React.Fragment>
            <Layout {...props}>
                <SpacePage {...props} />
            </Layout>
        </React.Fragment>
    );
};

SpaceIndex.getInitialProps = async () => {
    return {
        title: 'Space',
    };
};

export default SpaceIndex;
