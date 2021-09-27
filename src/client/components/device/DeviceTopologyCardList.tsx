import { IconButton } from '@material-ui/core';
import EjectIcon from '@material-ui/icons/Eject';
import clsx from 'clsx';
import React from 'react';
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
} from 'src/client/domain/device/DeviceVMs';
import DeviceSlice from 'src/client/slices/DeviceSlice';
import DeviceCard from './DeviceCard';
import SpaceCard from './SpaceCard';

interface DeviceTopologyCardListProps {
    project?: ProjectVM;
    spaces: SpaceVM[];
    space_selected?: SpaceVM;
    devices: DeviceVM[];
    device_selected?: DeviceVM;
}

const DeviceTopologyCardList: React.FC<DeviceTopologyCardListProps> = (
    props
) => {
    if (!props.project) {
        return (
            <div className={'root-card'}>
                {/*<div className="card-header">{}</div>*/}
                {/*<div className="card-list">{}</div>*/}
            </div>
        );
    }

    const dispatch = useDispatch();

    const project = props.project;
    const spaces = !props.spaces ? [] : props.spaces;
    const devices = !props.devices ? [] : props.devices;
    const cards = [];

    if (props.spaces) {
        const filtered = !props.space_selected
            ? spaces.filter((space) => space.parentId == null)
            : spaces.filter(
                  (space) => space.parentId == props.space_selected.id
              );

        const space_cards = filtered.map((space) => {
            return (
                <SpaceCard
                    key={space.id}
                    project={project}
                    space={space}
                    spaces={spaces}
                    devices={devices}
                />
            );
        });
        cards.unshift(...space_cards);
    }

    if (props.space_selected) {
        const device_cards = devices
            .filter((device) => device.spaceId == props.space_selected.id)
            .map((device) => {
                return (
                    <DeviceCard
                        key={device.id}
                        project={project}
                        device={device}
                        spaces={spaces}
                        devices={devices}
                    />
                );
            });
        cards.unshift(...device_cards);
    }

    const space = props.space_selected;

    const accept = [
        DeviceMaintainCardTypes.SpaceTemplateCard,
        DeviceMaintainCardTypes.DeviceTemplateCard,
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
                const target = {
                    type: DeviceMaintainCardTypes.SpaceCard,
                    payload: space as SpaceVM,
                };

                if (item.type == DeviceMaintainCardTypes.SpaceTemplateCard) {
                    return DeviceMaintainCardTypeHelper.canDrop(item, target);
                }

                if (!space) {
                    // Root Card may be project card
                    return false;
                }

                return DeviceMaintainCardTypeHelper.canDrop(item, target);
            },
            drop: (
                item: { type: string; payload: DeviceTemplateVM | DeviceVM },
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

                if (item.type == DeviceMaintainCardTypes.DeviceSmallCard) {
                    // console.log('move device to the space');
                    dispatch(DeviceSlice.changeDeviceLocation(space));
                    return;
                }

                if (item.type == DeviceMaintainCardTypes.SpaceTemplateCard) {
                    dispatch(DeviceSlice.addSpace(space));
                    return;
                }
            },
            collect: (monitor) => ({
                canDrop: !!monitor.canDrop(),
                isOver: !!monitor.isOver({ shallow: true }),
            }),
        }),
        [
            props.spaces,
            props.space_selected,
            props.devices,
            props.space_selected,
        ]
    );

    const classname = clsx(
        'root-card',
        'space-card',
        isOver ? 'is-over' : '',
        isOver && !canDrop ? 'cannot-drop' : ''
    );

    const header = !space
        ? `${project.name} - ${project.code} - ${project.id}`
        : `${space.name} - ${space.id}`;

    const parent_node =
        !space || !space.parentId
            ? null
            : spaces.find((item) => item.id == space.parentId);

    const handleSelectParentNode = (e) => {
        e.preventDefault();

        if (!space) {
            return;
        }

        if (!space.parentId) {
            dispatch(DeviceSlice.selectSpace(null));
            return;
        }

        if (!!parent_node) {
            dispatch(DeviceSlice.selectSpace(parent_node));
            return;
        }
    };

    return (
        <div className={classname} ref={drop}>
            <div className="card-header">
                <div className="header-name">{header}</div>
                <div className="header-actions">
                    {!!space && (
                        <IconButton onClick={handleSelectParentNode}>
                            <EjectIcon />
                        </IconButton>
                    )}
                </div>
            </div>
            <div className="card-list">{cards}</div>
        </div>
    );
};

export default DeviceTopologyCardList;
