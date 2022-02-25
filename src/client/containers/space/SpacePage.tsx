import { Card, CardContent, Tab, Tabs } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AppsIcon from '@material-ui/icons/Apps';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ListAltIcon from '@material-ui/icons/ListAlt';
import RouterIcon from '@material-ui/icons/Router';
import ShareIcon from '@material-ui/icons/Share';
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';
import dynamic from 'next/dynamic';
import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import GatewayBindDialog from 'src/client/components/space/GatewayBindDialog';
import GatewayConnectionCardList from 'src/client/components/space/GatewayConnectionCardList';
import GatewayUnBindDialog from 'src/client/components/space/GatewayUnBindDialog';
import ProjectList from 'src/client/components/space/ProjectList';
import SpaceBreadcrumbs from 'src/client/components/space/SpaceBreadcrumbs';
import SpaceCardStyleList from 'src/client/components/space/SpaceCardStyleList';
import SpaceTableStyleList from 'src/client/components/space/SpaceTableStyleList';
import SpaceTreeView from 'src/client/components/space/SpaceTreeView';
import TabPanel from 'src/client/components/TabPanel';
import ProjectVM from 'src/client/domain/project/ProjectVM';
import GatewayConnectionVM from 'src/client/domain/space/GatewayConnectionVM';
import SpaceVM, { SpaceTopology } from 'src/client/domain/space/SpaceVM';
import AxiosFactory from 'src/client/helper/AxiosFactory';
import PaginationVM from 'src/client/models/PaginationVM';
import { RootState } from 'src/client/reducer';
import FetchSlice from 'src/client/slices/FetchSlice';
import SpaceSlice from 'src/client/slices/SpaceSlice';
import ScrollUtil from 'src/client/utils/ScrollUtil';

const Space2DTopologyGraphWithNoSSR = dynamic(
    () => import('src/client/components/space/Space2DTopologyGraph'),
    { ssr: false }
);
const Space3DTopologyGraphWithNoSSR = dynamic(
    () => import('src/client/components/space/Space3DTopologyGraph'),
    { ssr: false }
);

interface Space2DTopologyProp {
    spaces: SpaceVM[];
}

const Space2DTopology: React.FC<Space2DTopologyProp> = (props) => {
    return (
        <React.Fragment>
            <Space2DTopologyGraphWithNoSSR spaces={props.spaces} />
        </React.Fragment>
    );
};

interface Space3DTopologyProp {
    spaces: SpaceVM[];
}

const Space3DTopology: React.FC<Space3DTopologyProp> = (props) => {
    return (
        <React.Fragment>
            <Space3DTopologyGraphWithNoSSR spaces={props.spaces} />
        </React.Fragment>
    );
};

const fetchClientIP = (dispatch: Dispatch<any>): void => {
    const url = 'https://api.ipify.org/?';
    const params = {
        format: 'json',
    };

    new AxiosFactory()
        .useBefore(() => {
            dispatch(FetchSlice.start());
        })
        .getInstance()
        .get<{ ip: string }>(url, { params })
        .then((res) => {
            dispatch(SpaceSlice.setClientIP(res.data.ip));
            // dispatch(SpaceSlice.closeUnBindModal());
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            dispatch(FetchSlice.end());
        });
};

const fetchGatewayConnections = (
    dispatch: Dispatch<any>,
    client_ip: string = ''
): void => {
    const url = '/api/gateway/connections';

    const params = {
        clientIP: client_ip || '',
    };

    new AxiosFactory()
        .useBearerToken()
        .useBefore(() => {
            // dispatch(FetchSlice.start());
        })
        .getInstance()
        .get<PaginationVM<GatewayConnectionVM>>(url, { params })
        .then((res) => {
            console.log('fetchGatewayConnections', res.data);
            dispatch(SpaceSlice.fetchGatewayConnections(res.data));
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            // dispatch(FetchSlice.end());
        });
};

const fetchProjects = (dispatch: Dispatch<any>): void => {
    const url = '/api/projects';

    const params = {};

    new AxiosFactory()
        .useBearerToken()
        .useBefore(() => {
            dispatch(FetchSlice.start());
        })
        .getInstance()
        .get<PaginationVM<ProjectVM>>(url, { params })
        .then((res) => {
            dispatch(SpaceSlice.fetchProjects(res.data));
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            dispatch(FetchSlice.end());
        });
};

const fetchSpaces = (dispatch: Dispatch<any>, project: ProjectVM): void => {
    const url = '/api/spaces';

    const params = {
        projectId: project.id,
    };

    new AxiosFactory()
        .useBearerToken()
        .useBefore(() => {
            dispatch(FetchSlice.start());
        })
        .getInstance()
        .get<PaginationVM<SpaceVM>>(url, { params })
        .then((res) => {
            dispatch(SpaceSlice.fetchSpaces(res.data));
            const spaces = res.data.results.filter((item) => !item.parentId);
            fetchSpaceTopology(dispatch, project, spaces);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            dispatch(FetchSlice.end());
        });
};

const fetchSpaceTopology = (
    dispatch: Dispatch<any>,
    project: ProjectVM,
    spaces: SpaceVM[]
): void => {
    Promise.all(
        spaces.map((space) => {
            const url = `/api/spaces/${space.id}/topology`;

            const params = {
                projectId: project.code,
            };

            return new AxiosFactory()
                .useBearerToken()
                .useBefore(() => {
                    dispatch(FetchSlice.start());
                })
                .getInstance()
                .get<SpaceTopology>(url, { params })
                .then((res) => {
                    dispatch(SpaceSlice.fetchSpaceTopology(res.data));
                    return true;
                })
                .catch((err) => {
                    console.log(err);
                    return false;
                })
                .finally(() => {
                    dispatch(FetchSlice.end());
                });
        })
    ).then((all) => {
        if (all) {
            fetchGatewayConnections(dispatch, client_ip_cache);
        }
    });
};

let client_ip_cache = null;

export interface SpacePageProps {
    title: string;
}

export const SpacePage: React.FC<SpacePageProps> = () => {
    const dispatch = useDispatch();
    const name = 'space';
    const classname = `${name} page`;

    /* Toolbox Panel */
    const [toolbox_tab_index, setToolboxTabIndex] = useState(0);
    const toolbox_tab_name = 'tool-box';

    const handleToolboxTabChange = (e: ChangeEvent, value: number) => {
        setToolboxTabIndex(value);
    };

    /* Space List View Tab Panel */
    const [space_list_tab_index, setSpaceListTabIndex] = useState(0);
    const space_list_tab_name = 'space-list';

    const handleSpaceListTabChange = (e: ChangeEvent, value: number) => {
        setSpaceListTabIndex(value);
    };

    const {
        projects,
        project_selected,
        spaces,
        space_selected,
        space_topology_map,
        connections,
        bind_modal,
        unbind_modal,
        client_ip,
    } = useSelector((state: RootState) => {
        return {
            projects: state.space.projects || [],
            project_selected: state.space.project_selected,
            spaces: state.space.spaces || [],
            space_selected: state.space.space_selected,
            space_topology_map: state.space.space_topology_map,
            connections: state.space.connections,
            bind_modal: state.space.gc_bind_modal,
            unbind_modal: state.space.gc_unbind_modal,
            client_ip: state.space.client_ip,
        };
    });

    useEffect(() => {
        ScrollUtil.GotoTop('.list-content');
    }, [space_selected]);

    const handleSelectSpace = (item: SpaceVM) => {
        dispatch(SpaceSlice.selectSpace(item));
    };

    const handleSelectSpaceCard = (item: SpaceVM) => {
        dispatch(SpaceSlice.selectSpace(item));
    };

    const handleSelectSmallSpaceCard = (item: SpaceVM) => {
        dispatch(SpaceSlice.selectSpace(item));
    };

    useEffect(() => {
        fetchProjects(dispatch);
    }, []);

    useEffect(() => {
        if (project_selected != null) {
            fetchSpaces(dispatch, project_selected);
        }
    }, [project_selected]);

    useEffect(() => {
        if (!client_ip) {
            return;
        }

        fetchGatewayConnections(dispatch, client_ip);
        client_ip_cache = client_ip;
    }, [client_ip]);

    useEffect(() => {
        if (client_ip == null) {
            fetchClientIP(dispatch);
        }
    }, [client_ip]);

    return (
        <React.Fragment>
            <div className={classname}>
                {/* <div className="name">{"Space Page"}</div> */}
                <div className="space-page-top">
                    {/* Breadcrumbs */}
                    <SpaceBreadcrumbs
                        project={project_selected}
                        space={space_selected}
                        spaces={spaces}
                        onClick={handleSelectSpace}
                    />

                    {/* Space View Tabs */}
                    <Tabs
                        className={'space-list-tabs'}
                        value={space_list_tab_index}
                        onChange={handleSpaceListTabChange}
                    >
                        <Tab icon={<AppsIcon />} aria-label="grid" />
                        <Tab icon={<ListAltIcon />} aria-label="table" />
                        <Tab icon={<ShareIcon />} aria-label="2d-topology" />
                        <Tab
                            icon={<ThreeDRotationIcon />}
                            aria-label="3d-topology"
                        />
                    </Tabs>
                </div>
                {/* Tool Box */}

                <div className="space-page-left">
                    <Card className={'space-maintain-card'}>
                        <CardContent className={'content'}>
                            <DndProvider backend={HTML5Backend}>
                                {/* Toolbox tabs */}
                                <div className={'toolbox'}>
                                    <div className={'toolbox-tabs'}>
                                        <Tabs
                                            value={toolbox_tab_index}
                                            onChange={handleToolboxTabChange}
                                        >
                                            <Tab
                                                icon={<AssignmentIcon />}
                                                aria-label="projects"
                                                onClick={() => {
                                                    fetchProjects(dispatch);
                                                }}
                                            />
                                            <Tab
                                                icon={<AccountTreeIcon />}
                                                aria-label="space-tree-view"
                                            />
                                            <Tab
                                                icon={<AppsIcon />}
                                                aria-label="space-cards"
                                            />
                                            <Tab
                                                icon={<RouterIcon />}
                                                aria-label="gateway-connections"
                                                onClick={() => {
                                                    fetchGatewayConnections(
                                                        dispatch,
                                                        client_ip
                                                    );
                                                }}
                                            />
                                        </Tabs>
                                    </div>
                                    <div className="toolbox-panels">
                                        <TabPanel
                                            name={toolbox_tab_name}
                                            value={toolbox_tab_index}
                                            index={0}
                                        >
                                            {/* Space Card Item list */}
                                            <ProjectList
                                                projects={projects}
                                                onClickCallback={() => {
                                                    setToolboxTabIndex(1);
                                                }}
                                            />
                                        </TabPanel>

                                        <TabPanel
                                            name={toolbox_tab_name}
                                            value={toolbox_tab_index}
                                            index={1}
                                        >
                                            {/* Spaces tree view */}
                                            <SpaceTreeView
                                                project={project_selected}
                                                spaces={spaces}
                                            />
                                        </TabPanel>

                                        <TabPanel
                                            name={toolbox_tab_name}
                                            value={toolbox_tab_index}
                                            index={2}
                                        >
                                            {'Space Card Item list'}
                                        </TabPanel>

                                        <TabPanel
                                            name={toolbox_tab_name}
                                            value={toolbox_tab_index}
                                            index={3}
                                        >
                                            <GatewayConnectionCardList
                                                connections={connections}
                                            />
                                        </TabPanel>
                                    </div>
                                </div>

                                {/* Space view panels*/}
                                <div className="list-content">
                                    {/* Space card style view in panel */}
                                    <TabPanel
                                        name={space_list_tab_name}
                                        value={space_list_tab_index}
                                        index={0}
                                    >
                                        <SpaceCardStyleList
                                            project_selected={project_selected}
                                            space_selected={space_selected}
                                            spaces={spaces}
                                            space_topology_map={
                                                space_topology_map
                                            }
                                            onSelectCard={handleSelectSpaceCard}
                                            onSelectSmallCard={
                                                handleSelectSmallSpaceCard
                                            }
                                        />
                                    </TabPanel>
                                    {/* Space table style view in panel */}
                                    <TabPanel
                                        name={space_list_tab_name}
                                        value={space_list_tab_index}
                                        index={1}
                                    >
                                        <SpaceTableStyleList
                                            spaces={spaces}
                                            selected={[]}
                                        />
                                    </TabPanel>
                                    {/* Space Topology Style view in panel */}
                                    <TabPanel
                                        name={space_list_tab_name}
                                        value={space_list_tab_index}
                                        index={2}
                                    >
                                        <Space2DTopology spaces={spaces} />
                                    </TabPanel>
                                    <TabPanel
                                        name={space_list_tab_name}
                                        value={space_list_tab_index}
                                        index={3}
                                    >
                                        <Space3DTopology spaces={spaces} />
                                    </TabPanel>
                                </div>
                            </DndProvider>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div>
                <GatewayBindDialog
                    project={project_selected}
                    open={bind_modal.open}
                    device={bind_modal.device}
                    connection={bind_modal.connection}
                    boundCallback={() => {
                        fetchSpaces(dispatch, project_selected);
                    }}
                />
                <GatewayUnBindDialog
                    open={unbind_modal.open}
                    project={project_selected}
                    device={unbind_modal.device}
                    boundCallback={() => {
                        fetchSpaces(dispatch, project_selected);
                    }}
                />
            </div>
        </React.Fragment>
    );
};

export default SpacePage;
