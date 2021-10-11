import { Breadcrumbs, Link } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import DeviceVM, {
    ProjectVM,
    SpaceVM,
} from 'src/client/domain/device/DeviceVM';

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

    if (!props.project) {
        return <Breadcrumbs aria-label="breadcrumb" className={classname} />;
    }

    let elements = [];

    const project_element = ((project) => {
        const handleClick = () => {
            dispatch(DeviceSlice.selectSpace(null));
            dispatch(DeviceSlice.selectDevice(null));
        };

        return (
            <Link key={project.id} onClick={handleClick}>
                {project.name}
            </Link>
        );
    })(props.project);

    elements.push(project_element);

    if (props.device_selected || props.space_selected) {
        const spaces = !props.spaces ? [] : props.spaces;

        const space_elements = [];

        const space = props.device_selected
            ? spaces.find((space) => space.id == props.device_selected.spaceId)
            : props.space_selected;

        let parent = space;

        while (parent) {
            const space_element = ((space) => {
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

            space_elements.unshift(space_element);

            if (!space.parentId) {
                break;
            }

            parent = spaces.find((space) => space.id == parent.parentId);
        }

        elements.push(...space_elements);
    }

    if (props.device_selected) {
        const device_element = (
            <Link
                key={props.device_selected.id}
                onClick={() => {
                    console.log(props.device_selected);
                }}
            >
                {props.device_selected.name}
            </Link>
        );

        elements.push(device_element);
    }

    return (
        <Breadcrumbs aria-label="breadcrumb" className={classname}>
            {elements}
        </Breadcrumbs>
    );
};

export default DeviceBreadcrumbs;
