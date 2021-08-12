import { Breadcrumbs, Link } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import DeviceVM, { SpaceVM } from 'src/client/domain/device/DeviceVMs';
import ProjectVM from 'src/client/domain/project/ProjectVM';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface DeviceBreadcrumbsProp {
    project: ProjectVM;
    spaces: SpaceVM[];
    space_selected: SpaceVM;
    devices: DeviceVM[];
    device_selected: DeviceVM;
    onClick?: Function;
}

const DeviceBreadcrumbs: React.FC<DeviceBreadcrumbsProp> = (props) => {
    const dispatch = useDispatch();

    const classname = 'device-breadcrumbs';
    let elements = [];

    if (!props.project) {
        return <Breadcrumbs aria-label="breadcrumb" className={classname} />;
    }

    const element = ((project) => {
        const handleClick = () => {
            dispatch(DeviceSlice.selectSpace(null));
            dispatch(DeviceSlice.selectDevice(null));
            // DeviceMaintainAPIs.fetchDeviceTopologyResources(dispatch, project);
        };

        return (
            <Link key={project.id} onClick={handleClick}>
                {project.name}
            </Link>
        );
    })(props.project);

    elements.push(element);

    if (props.device_selected || props.space_selected) {
        const spaces = [];

        const space = props.device_selected
            ? props.spaces.find(
                  (space) => space.id == props.device_selected.spaceId
              )
            : props.space_selected;

        let parent = space;

        while (parent) {
            const element = ((space) => {
                return (
                    <Link
                        key={space.id}
                        onClick={() => {
                            dispatch(DeviceSlice.selectSpace(space));
                            dispatch(DeviceSlice.selectDevice(null));
                        }}
                    >
                        {parent.name}
                    </Link>
                );
            })(parent);

            spaces.unshift(element);

            if (!space.parentId) {
                break;
            }

            parent = props.spaces.find((space) => space.id == parent.parentId);
        }

        elements.push(...spaces);
    }

    if (props.device_selected) {
        elements.push(
            <Link
                key={props.device_selected.id}
                onClick={() => {
                    console.log(props.device_selected);
                }}
            >
                {props.device_selected.name}
            </Link>
        );
    }

    return (
        <Breadcrumbs aria-label="breadcrumb" className={classname}>
            {elements}
        </Breadcrumbs>
    );
};

export default DeviceBreadcrumbs;
