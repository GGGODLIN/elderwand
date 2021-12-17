import Layout from 'src/client/containers/layout/Layout';
import LayoutSlice, { LayoutPayload } from 'src/client/slices/LayoutSlice';
import ProjectMaintainPage from 'src/client/containers/project/ProjectMaintainPage';
import React, { useEffect } from 'react';
import { InitialPayload, InitSlice } from 'src/client/slices/InitSlice';
import { NextPage, NextPageContext } from 'next';
import { useDispatch } from 'react-redux';

export interface ProjectIndexProps {
    title: string;
}

export const ProjectIndex: NextPage<ProjectIndexProps> = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const page: InitialPayload = {
            name: 'project',
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
                <ProjectMaintainPage {...props} />
            </Layout>
        </React.Fragment>
    );
};

ProjectIndex.getInitialProps = async (ctx: NextPageContext) => {
    return {
        title: 'Project',
    };
};

export default ProjectIndex;
