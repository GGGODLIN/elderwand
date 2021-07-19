import { NextPage } from 'next';
import React from 'react';
import { useDispatch } from 'react-redux';
import DevicePage from 'src/client/containers/device/DevicePage';
import Layout from 'src/client/containers/layout/Layout';
import PageInitialUtil from 'src/client/utils/PageInitialUtil';

export interface DeviceIndexProps {
    title: string;
}

export const DeviceIndex: NextPage<DeviceIndexProps> = (props) => {
    const dispatch = useDispatch();

    PageInitialUtil.initPageInfo(dispatch);
    PageInitialUtil.initPageLayoutWithUser(dispatch);
    PageInitialUtil.initUserInfo(dispatch);

    return (
        <React.Fragment>
            <Layout {...props}>
                <DevicePage {...props} />
            </Layout>
        </React.Fragment>
    );
};

DeviceIndex.getInitialProps = async () => {
    return {
        title: 'Device',
    };
};

export default DeviceIndex;
