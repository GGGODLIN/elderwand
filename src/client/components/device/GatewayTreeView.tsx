import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TreeItem, TreeView } from '@material-ui/lab';
import React from 'react';
import { useDispatch } from 'react-redux';
import DeviceVM, {
    ProjectVM,
    SpaceVM,
} from 'src/client/domain/device/DeviceVMs';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface GatewayTreeViewProp {
    project: ProjectVM;
    spaces: SpaceVM[];
    devices: DeviceVM[];
}

const GatewayTreeView: React.FC<GatewayTreeViewProp> = (props) => {
    const dispatch = useDispatch();

    if (!props.project) {
        return (
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            />
        );
    }

    let elements = [];

    let groups_by_space_map: { [key: string]: DeviceVM[] } = {};

    for (const device of props.devices) {
        const space = props.spaces.find((space) => space.id == device.spaceId);

        if (!space) {
            continue;
        }

        let parent = space;

        while (parent) {
            if (parent.parentId == null) {
                break;
            }
            parent = props.spaces.find((space) => space.id == parent.parentId);
        }

        if (!groups_by_space_map[parent.id]) {
            groups_by_space_map[parent.id] = [];
        }

        groups_by_space_map[parent.id].push(device);
    }

    const space_map = {};

    for (const space of props.spaces) {
        space_map[space.id] = space;
    }

    elements = Object.keys(groups_by_space_map).map((space_id) => {
        const space = space_map[space_id];

        const gws = groups_by_space_map[space_id]
            .filter((device) => device.type.categoryId == 'GW')
            .map((device) => {
                const space = space_map[device.spaceId];
                const handleClick = () => {
                    dispatch(DeviceSlice.selectSpace(space));
                    dispatch(DeviceSlice.selectDevice(device));
                };
                return (
                    <TreeItem
                        key={device.id}
                        nodeId={device.id}
                        label={`${device.name}`}
                        onLabelClick={handleClick}
                    >
                        {}
                    </TreeItem>
                );
            });

        const handleLabelClick = (e) => {
            e.preventDefault();
            dispatch(DeviceSlice.selectSpace(space));
            dispatch(DeviceSlice.selectDevice(null));
        };

        return (
            <TreeItem
                key={space.id}
                nodeId={space.id}
                label={space.name}
                onLabelClick={handleLabelClick}
            >
                {gws}
            </TreeItem>
        );
    });

    const id = props.project.id;
    const name = `${props.project.name} - ${props.project.code}`;
    const expanded = [id];
    // if (Array.isArray(props.spaces)) {
    //     const ids = props.spaces
    //         .filter((space) => space.parentId == null)
    //         .map((space) => {
    //             return space.id;
    //         });
    //
    //     expanded.push(...ids);
    // }

    const handleLabelClick = (e) => {
        e.preventDefault();
        dispatch(DeviceSlice.selectSpace(null));
        dispatch(DeviceSlice.selectDevice(null));
    };
    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultExpanded={expanded}
        >
            <TreeItem
                key={id}
                nodeId={id}
                label={name}
                onLabelClick={handleLabelClick}
            >
                {elements}
            </TreeItem>
        </TreeView>
    );
};

export default GatewayTreeView;
