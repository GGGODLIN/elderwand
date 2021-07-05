import { NextPage } from 'next';
import React from 'react';
import { useDispatch } from 'react-redux';
import Layout from 'src/client/containers/layout/Layout';
import DataMigrationPage from 'src/client/containers/migration/DataMigrationPage';
import PageInitialUtil from 'src/client/utils/PageInitialUtil';

interface MigrationIndexProps {
    title: string;
}

export const MigrationIndex: NextPage<MigrationIndexProps> = (props) => {
    const dispatch = useDispatch();

    PageInitialUtil.initPageInfo(dispatch);
    PageInitialUtil.initPageLayoutWithUser(dispatch);
    PageInitialUtil.initUserInfo(dispatch);

    return (
        <React.Fragment>
            <Layout {...props}>
                <DataMigrationPage {...props} />
            </Layout>
        </React.Fragment>
    );
};

MigrationIndex.getInitialProps = async () => {
    return {
        title: 'Data Migration',
    };
};

export default MigrationIndex;
