import {
    Breadcrumbs,
    Card,
    CardContent,
    Link,
    Tab,
    Tabs,
} from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AppsIcon from '@material-ui/icons/Apps';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ShareIcon from '@material-ui/icons/Share';
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';
import { TreeItem, TreeView } from '@material-ui/lab';
import clsx from 'clsx';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import TabPanel from 'src/client/components/TabPanel';
import DeviceMaintainAPIs from 'src/client/domain/device/DeviceMaintainAPIs';
import ProjectVM from 'src/client/domain/project/ProjectVM';
import { RootState } from 'src/client/reducer';
import DeviceSlice from 'src/client/slices/DeviceSlice';
import SpaceSlice from 'src/client/slices/SpaceSlice';
import { DeviceTemplateVM } from '../../domain/device/DeviceVMs';

interface DeviceBreadcrumbsProp {
    project: ProjectVM;
    onClick?: Function;
}

const DeviceBreadcrumbs: React.FC<DeviceBreadcrumbsProp> = (props) => {
    const classname = 'device-breadcrumbs';

    if (!props.project) {
        return <Breadcrumbs aria-label="breadcrumb" className={classname} />;
    }

    const element = ((project) => {
        return <Link key={project.id}>{project.name}</Link>;
    })(props.project);

    // const target = props.device;
    // const links = [] as DeviceVM[];
    //
    // const elements = links.map((item: DeviceVM) => {
    //     const handleClick = () => {
    //         if (!props.onClick) {
    //             return;
    //         }
    //         props.onClick(item);
    //     };
    //     return (
    //         <Link key={item.id} onClick={handleClick}>
    //             {item.name}
    //         </Link>
    //     );
    // });

    // const elements = [];
    const elements = (() => {
        const handleClick = () => {
            console.log('handleClick');
        };

        return [
            <Link key={1} onClick={handleClick}>
                {'Gateway'}
            </Link>,
            <Link key={2} onClick={handleClick}>
                {'AG Device'}
            </Link>,
            <Link key={3} onClick={handleClick}>
                {'Device'}
            </Link>,
        ];
    })();

    return (
        <Breadcrumbs aria-label="breadcrumb" className={classname}>
            {element}
            {elements}
        </Breadcrumbs>
    );
};

function* selectProjectSaga() {}

interface ProjectTreeViewProps {
    projects: ProjectVM[];
    onClickCallback?: Function;
}

const ProjectTreeView = (props: ProjectTreeViewProps) => {
    const dispatch = useDispatch();

    const items = Array.isArray(props.projects) ? props.projects : [];

    const elements = items.map((item: ProjectVM) => {
        const id = item.id;
        const name = `${item.code}-${item.name}`;

        const handleClick = () => {
            dispatch(SpaceSlice.clearSelected());
            dispatch(SpaceSlice.selectProject(item));
        };
        return (
            <TreeItem key={id} nodeId={id} label={name} onClick={handleClick} />
        );
    });

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {elements}
        </TreeView>
    );
};

export interface DevicePageProps {
    title: string;
}

export const DevicePage: React.FC<DevicePageProps> = () => {
    const dispatch = useDispatch();
    const name = 'device';
    const classname = `${name} page`;

    // device topology panels
    const device_topology_tab_name = 'device-topology-tab';
    const [device_topology_tab_index, setDeviceTopologyTabIndex] = useState(0);
    const handleSelectDeviceTopologyTab = (e: ChangeEvent, value: number) => {
        setDeviceTopologyTabIndex(value);
    };

    // Tool box
    const toolbox_tab_name = 'device-tool-box';
    const [toolbox_tab_index, setDeviceToolboxTabIndex] = useState(2);
    const handlesSelectDeviceToolboxTab = (e: ChangeEvent, value: number) => {
        setDeviceToolboxTabIndex(value);
    };

    // state selector
    const { projects, project_selected, templates } = useSelector(
        (state: RootState) => {
            return {
                projects: state.device.projects,
                project_selected: state.device.project_selected,
                templates: state.device.device_templates,
            };
        }
    );

    // TODO useSelector

    const handleSelectDevice = () => {
        console.log('SelectDevice');
    };

    const handleSelectDeviceTopology = () => {
        console.log('handleSelectDeviceTopology');
    };

    useEffect(() => {
        DeviceSlice.clearProjectSelected();
        DeviceMaintainAPIs.fetchProjects(dispatch);
        DeviceMaintainAPIs.fetchDeviceTemplates(dispatch);
        return () => {};
    }, []);

    return (
        <React.Fragment>
            <div className={classname}>
                {/* <div className="name">{"Device Page"}</div> */}
                <div className="device-page-top">
                    {/* Breadcrumbs */}
                    <DeviceBreadcrumbs
                        project={project_selected}
                        // space={space_selected}
                        // spaces={spaces}
                        onClick={handleSelectDeviceTopologyTab}
                    />

                    {/* Content Tabs */}
                    <Tabs
                        className={'device-topology-tabs'}
                        value={device_topology_tab_index}
                        onChange={handleSelectDeviceTopology}
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

                <div className="device-page-content">
                    <DndProvider backend={HTML5Backend}>
                        <Card>
                            <CardContent className={'content'}>
                                {/* Toolbox tabs */}
                                <div className="device-tool-box">
                                    <div className={'toolbox-tabs'}>
                                        <Tabs
                                            value={toolbox_tab_index}
                                            onChange={
                                                handlesSelectDeviceToolboxTab
                                            }
                                        >
                                            <Tab
                                                icon={<AssignmentIcon />}
                                                aria-label="projects"
                                                onClick={() => {
                                                    DeviceSlice.clearProjectSelected();
                                                    DeviceMaintainAPIs.fetchProjects(
                                                        dispatch
                                                    );
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
                                            {/*<Tab*/}
                                            {/*    icon={<RouterIcon />}*/}
                                            {/*    aria-label="gateway-connections"*/}
                                            {/*/>*/}
                                        </Tabs>
                                    </div>
                                    <div className="toolbox-panels">
                                        <TabPanel
                                            name={toolbox_tab_name}
                                            value={toolbox_tab_index}
                                            index={0}
                                        >
                                            <ProjectTreeView
                                                projects={projects}
                                            />
                                        </TabPanel>
                                        <TabPanel
                                            name={toolbox_tab_name}
                                            value={toolbox_tab_index}
                                            index={1}
                                        >
                                            <div>Device Tree</div>
                                        </TabPanel>
                                        <TabPanel
                                            name={toolbox_tab_name}
                                            value={toolbox_tab_index}
                                            index={2}
                                        >
                                            <DeviceTemplateCardList
                                                templates={templates}
                                            />
                                        </TabPanel>
                                    </div>
                                </div>

                                {/* Device Topology Panels*/}
                                <div className="topology-content">
                                    {'Device Topology'}
                                </div>
                            </CardContent>
                        </Card>
                    </DndProvider>
                </div>
            </div>
        </React.Fragment>
    );
};

interface DeviceTemplateCardProps {
    template: DeviceTemplateVM;
}

const DeviceTemplateCard: React.FC<DeviceTemplateCardProps> = (props) => {
    const name = props.template.name;

    const classname = clsx(
        'device-template-card',
        props.template.type.categoryId
    );

    return (
        <Card
            // ref={ drag}
            // style={style}
            // key={id}
            className={classname}
            variant="outlined"
            // onClick={handleClick}
            // onDragStart={handleDragStart}
            // onDoubleClick={handleDoubleClick}
        >
            <div className="card-header">
                <div className="header-name">{name}</div>
                {/* <div className="header-actions">{"actions"}</div> */}
            </div>
            <CardContent>
                <div>{props.template.model.name}</div>
                <div>{props.template.icon.name}</div>
            </CardContent>
            <div className="card-footer">
                {/*<div className="footer-actions">{'actions'}</div>*/}
            </div>
        </Card>
    );
};

interface DeviceTemplateCardListProps {
    templates: DeviceTemplateVM[];
}

export const DeviceTemplateCardList: React.FC<DeviceTemplateCardListProps> = (
    props
) => {
    const dispatch = useDispatch();

    const cards = props.templates.map((template) => {
        return <DeviceTemplateCard key={template.id} template={template} />;
    });

    return (
        <div className={'device-template-list'}>
            <div className="cards">{cards}</div>
        </div>
    );
};

export default DevicePage;
