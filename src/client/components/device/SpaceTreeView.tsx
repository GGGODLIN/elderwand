import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { TreeItem, TreeView } from '@material-ui/lab';
import clsx from 'clsx';
import React, { Dispatch } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import DeviceMaintainCardTypes, {
    DeviceMaintainCardType,
    DeviceMaintainCardTypeHelper,
} from 'src/client/domain/device/DeviceMaintainItemTypes';
import DeviceVM, {
    DeviceTemplateVM,
    ProjectVM,
    SpaceVM,
} from 'src/client/domain/device/DeviceVM';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface SpaceTreeViewProp {
    project: ProjectVM;
    spaces: SpaceVM[];
}

function useTreeItemDND(
    dispatch: Dispatch<any>,
    spaces: SpaceVM[],
    space: SpaceVM
) {
    const accept = [
        DeviceMaintainCardTypes.SpaceCard, // performance issue
        DeviceMaintainCardTypes.DeviceSmallCard,
    ];

    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: accept,
            canDrop: (
                item: {
                    type: DeviceMaintainCardType;
                    payload: DeviceTemplateVM | DeviceVM;
                },
                monitor
            ) => {
                // const source = item.payload as DeviceVM;
                // return source.spaceId != space.id;
                const target = {
                    type: DeviceMaintainCardTypes.SpaceCard,
                    payload: space as SpaceVM,
                };
                return DeviceMaintainCardTypeHelper.canDrop(item, target);
            },
            drop: (
                item: {
                    type: DeviceMaintainCardType;
                    payload: DeviceTemplateVM | DeviceVM | SpaceVM;
                },
                monitor
            ) => {
                if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
                    return;
                }

                if (item.type == DeviceMaintainCardTypes.DeviceTemplateCard) {
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

                if (item.type == DeviceMaintainCardTypes.SpaceCard) {
                    dispatch(
                        DeviceSlice.changeSpaceParent({
                            space: item.payload as SpaceVM,
                            parent: space,
                        })
                    );
                    return;
                }
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver({ shallow: true }),
                canDrop: !!monitor.canDrop(),
            }),
        }),
        [spaces]
    );

    const classname = clsx(
        isOver ? 'is-over' : '',
        isOver && canDrop ? 'can-drop' : '',
        isOver && !canDrop ? 'cannot-drop' : ''
    );
    return { drop, classname };
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

            const { drop, classname } = useTreeItemDND(
                dispatch,
                props.spaces,
                space
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

              const { drop, classname } = useTreeItemDND(
                  dispatch,
                  props.spaces,
                  space
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

    const id = props.project.id;
    const name = `${props.project.name} - ${props.project.code}`;
    const expanded = [id];

    expanded.push(...root_spaces.map((space) => space.id));

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
