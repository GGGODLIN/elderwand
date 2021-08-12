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

    const cards = [];

    if (props.spaces) {
        const filtered = !props.space_selected
            ? props.spaces.filter((space) => space.parentId == null)
            : props.spaces.filter(
                  (space) => space.parentId == props.space_selected.id
              );

        const space_cards = filtered.map((space) => {
            return (
                <SpaceCard
                    key={space.id}
                    space={space}
                    spaces={props.spaces}
                    devices={props.devices}
                />
            );
        });
        cards.unshift(...space_cards);
    }

    if (props.space_selected) {
        const device_cards = props.devices
            .filter((device) => device.spaceId == props.space_selected.id)
            .map((device) => {
                return (
                    <DeviceCard
                        key={device.id}
                        device={device}
                        devices={props.devices}
                        spaces={props.spaces}
                    />
                );
            });
        cards.unshift(...device_cards);
    }

    const dispatch = useDispatch();

    const space = props.space_selected;

    const accept = [
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
                if (!space) {
                    // Root Card may be project card
                    return false;
                }

                const target = {
                    type: DeviceMaintainCardTypes.SpaceCard,
                    payload: space as SpaceVM,
                };

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
            },
            collect: (monitor) => ({
                canDrop: !!monitor.canDrop(),
                isOver: !!monitor.isOver({ shallow: true }),
            }),
        }),
        [props.spaces, props.devices]
    );

    const classname = clsx(
        'root-card',
        'space-card',
        isOver ? 'is-over' : '',
        isOver && !canDrop ? 'cannot-drop' : ''
    );

    const header = !space
        ? `${props.project.name} - ${props.project.code} - ${props.project.id}`
        : `${space.name} - ${space.id}`;

    const parent =
        !space || !space.parentId
            ? null
            : props.spaces.find((item) => item.id == space.parentId);

    const handleSelectParentNode = (e) => {
        e.preventDefault();

        if (!space) {
            return;
        }

        if (!space.parentId) {
            dispatch(DeviceSlice.selectSpace(null));
            return;
        }

        if (!!parent) {
            dispatch(DeviceSlice.selectSpace(parent));
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
                    {}
                </div>
            </div>
            <div className="card-list">{cards}</div>
        </div>
    );
};

export default DeviceTopologyCardList;
