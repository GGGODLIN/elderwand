import { Card, CardContent, Tab, Tabs } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AppsIcon from '@material-ui/icons/Apps';
import AssignmentIcon from '@material-ui/icons/Assignment';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MemoryIcon from '@material-ui/icons/Memory';
import ShareIcon from '@material-ui/icons/Share';
import ThreeDRotationIcon from '@material-ui/icons/ThreeDRotation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDispatch, useSelector } from 'react-redux';
import AddSpaceDialog from 'src/client/components/device/AddSpaceDialog';
import ChangeDeviceLocationDialog from 'src/client/components/device/ChangeDeviceLocationDialog';
import ChangeDeviceParentDialog from 'src/client/components/device/ChangeDeviceParentDialog';
import ChangeSpaceParentDialog from 'src/client/components/device/ChangeSpaceParentDialog';
import DeviceBreadcrumbs from 'src/client/components/device/DeviceBreadcrumbs';
import DeviceTemplateCardList from 'src/client/components/device/DeviceTemplateCardList';
import DeviceTopologyCardList from 'src/client/components/device/DeviceTopologyCardList';
import EditDeviceSettingDialog from 'src/client/components/device/EditDeviceSettingDialog';
import GatewayTreeView from 'src/client/components/device/GatewayTreeView';
import PlaceDeviceToDeviceDialog from 'src/client/components/device/PlaceDeviceToDeviceDialog';
import PlaceDeviceToSpaceDialog from 'src/client/components/device/PlaceDeviceToSpaceDialog';
import ProjectTreeView from 'src/client/components/device/ProjectTreeView';
import RemoveDeviceDialog from 'src/client/components/device/RemoveDeviceDialog';
import RemoveSpaceDialog from 'src/client/components/device/RemoveSpaceDialog';
import SpaceTemplateCardList from 'src/client/components/device/SpaceTemplateCardList';
import SpaceTreeView from 'src/client/components/device/SpaceTreeView';
import UnlinkParentDeviceDialog from 'src/client/components/device/UnlinkParentDeviceDialog';
import TabPanel from 'src/client/components/TabPanel';
import DeviceMaintainAPIs from 'src/client/domain/device/DeviceMaintainAPIs';
import { RootState } from 'src/client/reducer';
import DeviceSlice from 'src/client/slices/DeviceSlice';

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
    const [toolbox_tab_index, setDeviceToolboxTabIndex] = useState(0);
    const handlesSelectDeviceToolboxTab = (e: ChangeEvent, value: number) => {
        setDeviceToolboxTabIndex(value);
    };

    const handleSelectDeviceTopology = () => {
        console.log('handleSelectDeviceTopology');
    };

    // state selector
    const {
        projects,
        project_selected,
        spaces,
        space_selected,
        devices,
        device_selected,
        space_templates,
        space_template_selected,
        device_templates,
        device_templates_selected,
        place_device_to_space_dialog,
        place_device_to_device_dialog,
        change_device_location_dialog,
        append_device_to_device_dialog,
        remove_device_dialog,
        change_device_parent_dialog,
        unlink_parent_device_dialog,
        add_space_dialog,
        change_space_parent_dialog,
        remove_space_dialog,
        edit_device_setting_dialog,
    } = useSelector((state: RootState) => {
        return {
            projects: state.device.projects,
            project_selected: state.device.project_selected,
            spaces: state.device.spaces,
            space_selected: state.device.space_selected,
            devices: state.device.devices,
            space_template_selected: state.device.space_template_selected,
            space_templates: state.device.space_templates,
            device_selected: state.device.device_selected,
            device_templates: state.device.device_templates,
            device_templates_selected: state.device.device_templates_selected,
            place_device_to_space_dialog:
                state.device.place_device_to_space_dialog,
            place_device_to_device_dialog:
                state.device.place_device_to_device_dialog,
            append_device_to_device_dialog:
                state.device.connect_device_to_device_dialog,
            remove_device_dialog: state.device.remove_device_dialog,
            change_device_location_dialog:
                state.device.change_device_location_dialog,
            change_device_parent_dialog:
                state.device.change_device_parent_dialog,
            unlink_parent_device_dialog:
                state.device.unlink_parent_device_dialog,
            add_space_dialog: state.device.add_space_dialog,
            remove_space_dialog: state.device.remove_space_dialog,
            change_space_parent_dialog: state.device.change_space_parent_dialog,
            edit_device_setting_dialog: state.device.edit_device_setting_dialog,
        };
    });

    useEffect(() => {
        DeviceSlice.clearProjectSelected();
        DeviceMaintainAPIs.fetchProjects(dispatch);
        DeviceMaintainAPIs.fetchSpaceTemplates(dispatch);
        DeviceMaintainAPIs.fetchDeviceTemplates(dispatch);
        DeviceMaintainAPIs.fetchIcons(dispatch);
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
                        spaces={spaces}
                        space_selected={space_selected}
                        devices={devices}
                        device_selected={device_selected}
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
                                                onDoubleClick={() => {
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
                                                icon={<DeviceHubIcon />}
                                                aria-label="device-tree-view"
                                            />
                                            <Tab
                                                icon={<MemoryIcon />}
                                                aria-label="device-template-cards"
                                                onDoubleClick={() => {
                                                    DeviceMaintainAPIs.fetchDeviceTemplates(
                                                        dispatch
                                                    );
                                                }}
                                            />
                                            <Tab
                                                icon={<HomeWorkIcon />}
                                                aria-label=" space-template-cards"
                                                onDoubleClick={() => {
                                                    DeviceMaintainAPIs.fetchSpaceTemplates(
                                                        dispatch
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
                                            <ProjectTreeView
                                                projects={projects}
                                                onClickCallback={() => {
                                                    // setDeviceToolboxTabIndex(1);
                                                }}
                                                onDoubleClickCallback={() => {
                                                    // setDeviceToolboxTabIndex(1);
                                                }}
                                            />
                                        </TabPanel>

                                        <TabPanel
                                            name={toolbox_tab_name}
                                            value={toolbox_tab_index}
                                            index={1}
                                        >
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
                                            <GatewayTreeView
                                                project={project_selected}
                                                spaces={spaces}
                                                devices={devices}
                                            />
                                        </TabPanel>

                                        <TabPanel
                                            name={toolbox_tab_name}
                                            value={toolbox_tab_index}
                                            index={3}
                                        >
                                            <DeviceTemplateCardList
                                                templates={device_templates}
                                            />
                                        </TabPanel>

                                        <TabPanel
                                            name={toolbox_tab_name}
                                            value={toolbox_tab_index}
                                            index={4}
                                        >
                                            <SpaceTemplateCardList
                                                templates={space_templates}
                                            />
                                        </TabPanel>
                                    </div>
                                </div>

                                {/* Device Topology Panels*/}
                                <div className="topology-content">
                                    <DeviceTopologyCardList
                                        project={project_selected}
                                        spaces={spaces}
                                        space_selected={space_selected}
                                        devices={devices}
                                        device_selected={device_selected}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </DndProvider>
                </div>
                <PlaceDeviceToSpaceDialog
                    open={place_device_to_space_dialog.open}
                    project={place_device_to_space_dialog.project}
                    space={place_device_to_space_dialog.space}
                    template={place_device_to_space_dialog.template}
                />
                <PlaceDeviceToDeviceDialog
                    open={place_device_to_device_dialog.open}
                    project={place_device_to_device_dialog.project}
                    device={place_device_to_device_dialog.device}
                    template={place_device_to_device_dialog.template}
                />
                <ChangeDeviceLocationDialog
                    open={change_device_location_dialog.open}
                    project={change_device_location_dialog.project}
                    space={change_device_location_dialog.space}
                    device={change_device_location_dialog.device}
                />
                <ChangeDeviceParentDialog
                    open={change_device_parent_dialog.open}
                    project={change_device_parent_dialog.project}
                    parent={change_device_parent_dialog.parent}
                    device={change_device_parent_dialog.device}
                />
                <UnlinkParentDeviceDialog
                    open={unlink_parent_device_dialog.open}
                    project={unlink_parent_device_dialog.project}
                    device={unlink_parent_device_dialog.device}
                />
                <RemoveDeviceDialog
                    open={remove_device_dialog.open}
                    project={remove_device_dialog.project}
                    device={remove_device_dialog.device}
                />
                <AddSpaceDialog
                    open={add_space_dialog.open}
                    project={add_space_dialog.project}
                    space={add_space_dialog.space}
                    template={add_space_dialog.space_template}
                />
                <ChangeSpaceParentDialog
                    open={change_space_parent_dialog.open}
                    project={change_space_parent_dialog.project}
                    parent={change_space_parent_dialog.parent}
                    space={change_space_parent_dialog.space}
                />
                <RemoveSpaceDialog
                    open={remove_space_dialog.open}
                    project={remove_space_dialog.project}
                    space={remove_space_dialog.space}
                />
                <EditDeviceSettingDialog
                    open={edit_device_setting_dialog.open}
                    project={edit_device_setting_dialog.project}
                    space={edit_device_setting_dialog.space}
                    device={edit_device_setting_dialog.device}
                />
            </div>
        </React.Fragment>
    );
};

export default DevicePage;
