import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TreeItem, TreeView } from '@material-ui/lab';
import clsx from 'clsx';
import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import DeviceMaintainCardTypes from 'src/client/domain/device/DeviceMaintainItemTypes';
import DeviceVM, {
    DeviceTemplateVM,
    ProjectVM,
    SpaceVM,
} from 'src/client/domain/device/DeviceVMs';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface SpaceTreeViewProp {
    project: ProjectVM;
    spaces: SpaceVM[];
}

const SpaceTreeView: React.FC<SpaceTreeViewProp> = (props) => {
    const dispatch = useDispatch();

    if (!props.project) {
        return (
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            />
        );
    }
    const space_map: { [key: string]: SpaceVM } = {};

    for (const space of props.spaces) {
        space_map[space.id] = space;
    }

    const root_spaces = !props.spaces
        ? []
        : props.spaces.filter((space) => !space.parentId);

    const renderLeaves = (parent: string, sources: SpaceVM[]) => {
        const leaves = sources.filter((space) => space.parentId == parent);

        if (!leaves.length) {
            return;
        }

        return leaves.map((space) => {
            const parent = space.id;
            const leaves = renderLeaves(parent, props.spaces);

            const handleLabelClick = (e) => {
                e.preventDefault();
                dispatch(DeviceSlice.selectSpace(space));
                dispatch(DeviceSlice.selectDevice(null));
            };

            const accept = [DeviceMaintainCardTypes.DeviceSmallCard];

            const [{ isOver, canDrop }, drop] = useDrop(
                () => ({
                    accept: accept,
                    canDrop: (
                        item: {
                            type: string;
                            payload: DeviceTemplateVM | DeviceVM;
                        },
                        monitor
                    ) => {
                        const source = item.payload as DeviceVM;
                        return source.spaceId != space.id;
                    },
                    drop: (
                        item: {
                            type: string;
                            payload: DeviceTemplateVM | DeviceVM;
                        },
                        monitor
                    ) => {
                        if (
                            monitor.didDrop() ||
                            !monitor.isOver({ shallow: true })
                        ) {
                            return;
                        }

                        if (
                            item.type ==
                            DeviceMaintainCardTypes.DeviceTemplateCard
                        ) {
                            // console.log('place device template to space');
                            dispatch(DeviceSlice.placeDeviceToSpace(space));
                            return;
                        }

                        if (
                            item.type == DeviceMaintainCardTypes.DeviceCard ||
                            item.type == DeviceMaintainCardTypes.DeviceSmallCard
                        ) {
                            // console.log('move device to the space');
                            dispatch(DeviceSlice.changeDeviceLocation(space));
                            return;
                        }
                    },
                    collect: (monitor) => ({
                        isOver: !!monitor.isOver({ shallow: true }),
                        canDrop: !!monitor.canDrop(),
                    }),
                }),
                [space]
            );

            // TODO
            const classname = clsx(
                isOver ? 'is-over' : '',
                isOver && canDrop ? 'can-drop' : '',
                isOver && !canDrop ? 'cannot-drop' : ''
            );

            return (
                <TreeItem
                    className={classname}
                    ref={drop}
                    key={space.id}
                    nodeId={space.id}
                    label={space.name}
                    onLabelClick={handleLabelClick}
                >
                    {leaves}
                </TreeItem>
            );
        });
    };

    const elements = !root_spaces.length
        ? []
        : root_spaces.map((space) => {
              const parent = space.id;
              const leaves = renderLeaves(parent, props.spaces);

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
                      {leaves}
                  </TreeItem>
              );
          });

    const id = props.project.id;
    const name = `${props.project.name} - ${props.project.code}`;
    const expanded = [id];

    // expanded.push(...root_spaces.map((space) => space.id));

    const handleLabelClick = (e) => {
        e.preventDefault();
        dispatch(DeviceSlice.selectSpace(null));
        dispatch(DeviceSlice.selectDevice(null));
    };

    return (
        <TreeView
            className={'space-tree-view'}
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

export default SpaceTreeView;
