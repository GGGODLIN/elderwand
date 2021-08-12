import { Tab, Tabs } from '@material-ui/core';
import AppsIcon from '@material-ui/icons/Apps';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { AxiosInstance } from 'axios';
import clsx from 'clsx';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AssignUserToProjectGroupFAB } from 'src/client/components/project/AssignUserToProjectGroupFAB';
import { CreateProjectFAB } from 'src/client/components/project/CreateProjectFAB';
import { ProjectCardGrid } from 'src/client/components/project/ProjectCardGrid';
import { ProjectListTable } from 'src/client/components/project/ProjectListTable';
import { RootState } from 'src/client/reducer';

export interface ProjectMaintainPageProps {
    title: string;
}

const PageSize = 48 * 2;

const fetchProjectOnInitial = (
    client: AxiosInstance,
    // dispatch: Dispatch<any>,
    refresh: boolean
) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const params = {
            limit: PageSize,
            offset: 0,
        };

        if (refresh) {
            // TODO rewrite
            // client
            //     .get<PaginationVM<ProjectVM>>('/api/projects', {
            //         params: params,
            //     })
            //     .then((res) => {
            //         console.log(res.data);
            //         if (res.data.offset === 0) {
            //             ScrollUtil.GotoTop('main');
            //         }
            //         dispatch(ProjectSlice.fetch(res.data));
            //     })
            //     .catch((err: AxiosError) => {
            //         console.log(err.message);
            //         AxiosUtil.redirectUnAuthorization(err);
            //         dispatch(FetchSlice.fail({ error: err.message }));
            //     })
            //     .finally(() => {
            //         dispatch(FetchSlice.end());
            //     });
        }
    }, [refresh]);
};

interface TabPanelProps {
    children?: React.ReactNode;
    value: number;
    index: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index } = props;

    const id = `tabpanel-${index}`;
    const label = `tab-${index}`;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={id}
            aria-labelledby={label}
        >
            {value === index && children}
        </div>
    );
}

export const ProjectMaintainPage: React.FC<ProjectMaintainPageProps> = () => {
    const name = 'project';
    const classname = `${name} page`;
    const dispatch = useDispatch();

    /* GOTO TOP */
    const { goto_top } = useSelector((state: RootState) => state.layout);

    const actions = clsx(['fab-actions', goto_top.show ? 'with-goto-top' : '']);

    /* Tab Panel */
    const [tab_index, setTabIndex] = useState(1);

    const handleChange = (e: ChangeEvent, value: number) => {
        setTabIndex(value);
    };

    /* Projects fetch */
    const { projects, refresh, selected } = useSelector((state: RootState) => {
        return {
            projects: state.project.page_result.results,
            selected: state.project.selected,
            refresh: state.project.fetch_refresh,
        };
    });

    // TODO rewrite
    // const origin = AxiosUtil.getOriginWithPort();
    // const client = AxiosUtil.makeAxiosInstance(dispatch, origin);
    // fetchProjectOnInitial(client, refresh);

    return (
        <React.Fragment>
            <div className={classname}>
                <Tabs
                    className={'project-list-style-tab'}
                    value={tab_index}
                    onChange={handleChange}
                >
                    <Tab icon={<AppsIcon />} aria-label="grid" />
                    <Tab icon={<ListAltIcon />} aria-label="table" />
                </Tabs>
                <TabPanel value={tab_index} index={0}>
                    <ProjectCardGrid projects={projects} />
                </TabPanel>
                <TabPanel value={tab_index} index={1}>
                    <ProjectListTable projects={projects} selected={selected} />
                </TabPanel>
                <div className={actions}>
                    <CreateProjectFAB />
                    {/* TODO Enable with selected not 0 */}
                    <AssignUserToProjectGroupFAB
                        disable={selected.length <= 0}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProjectMaintainPage;
