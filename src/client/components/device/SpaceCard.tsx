import { Card, CardContent, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import clsx from 'clsx';
import React, { CSSProperties } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import DeviceMaintainCardTypes, {
    DeviceMaintainCardType,
    DeviceMaintainCardTypeHelper,
} from 'src/client/domain/device/DeviceMaintainItemTypes';
import DeviceVM, {
    DeviceTemplateVM,
    SpaceVM,
} from 'src/client/domain/device/DeviceVMs';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface DeviceSmallCardProp {
    device: DeviceVM;
    spaces: SpaceVM[];
    devices: DeviceVM[];
}

const DeviceSmallCard: React.FC<DeviceSmallCardProp> = (props) => {
    if (!props.device) {
        return <React.Fragment />;
    }

    const dispatch = useDispatch();

    // const spaces = !props.spaces ? [] : props.spaces;
    // const devices = !props.devices ? [] : props.devices;
    const device = props.device;

    const space = props.spaces.find((space) => space.id == device.spaceId);
    const parent = props.devices.find((item) => item.id == device.parentId);

    const name = device.name;
    const isBound = !!device.imei;

    // const handleClick = (e) => {
    //     e.stopPropagation();
    // };
    //
    // const handleDoubleClick = (e) => {
    //     e.stopPropagation();
    //     // dispatch(DeviceSlice.selectSpace(space));
    // };

    const handleSelectSpace = (e) => {
        e.stopPropagation();
        dispatch(DeviceSlice.selectSpace(space));
    };

    const handleSelectDevice = (e) => {
        e.stopPropagation();
        dispatch(DeviceSlice.selectDevice(device));
    };

    const handleUnlinkDevice = (e) => {
        e.preventDefault();
        dispatch(DeviceSlice.unlinkParentDevice(device));
    };

    const handleRemoveDevice = () => {
        dispatch(DeviceSlice.removeDevice(device));
    };

    const accept = [
        DeviceMaintainCardTypes.DeviceTemplateCard,
        DeviceMaintainCardTypes.DeviceCard,
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
                    type: DeviceMaintainCardTypes.DeviceSmallCard,
                    payload: device,
                };
                return DeviceMaintainCardTypeHelper.canDrop(item, target);
            },
            drop: (item, monitor) => {
                if (monitor.didDrop() || !monitor.isOver({ shallow: true })) {
                    return;
                }

                if (item.type == DeviceMaintainCardTypes.DeviceTemplateCard) {
                    dispatch(DeviceSlice.placeDeviceToDevice(device));
                    return;
                }

                if (
                    item.type == DeviceMaintainCardTypes.DeviceCard ||
                    item.type == DeviceMaintainCardTypes.DeviceSmallCard
                ) {
                    dispatch(DeviceSlice.changeDeviceParent(device));
                    return;
                }
            },
            collect: (monitor) => ({
                canDrop: !!monitor.canDrop(),
                isOver: !!monitor.isOver({ shallow: true }),
            }),
        }),
        [device]
    );

    const [{ isDragging }, drag] = useDrag(() => ({
        type: DeviceMaintainCardTypes.DeviceSmallCard,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
        item: {
            type: DeviceMaintainCardTypes.DeviceSmallCard,
            payload: device,
        },
    }));

    const style: CSSProperties = {
        opacity: isDragging ? 0.5 : 1,
    };

    const classname = clsx(
        'device-xs-card',
        device.type.categoryId,
        isOver ? 'is-over' : '',
        isOver && !canDrop ? 'cannot-drop' : '',
        isBound ? 'is-bound' : ''
    );

    function ref(elem) {
        drop(elem);
        drag(elem);
    }

    return (
        <Card
            ref={ref}
            style={style}
            className={classname}
            variant="outlined"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            onDoubleClick={handleSelectSpace}
            onMouseDown={handleSelectDevice}
        >
            <div className="card-header">
                <div className="header-name">{name}</div>
                <div className="header-actions">{}</div>
            </div>
            <CardContent>
                <div>{device.dvId}</div>
                <div>{device.type.name}</div>
                <div>{parent ? `${parent.name} - ${parent.dvId}` : ''}</div>
            </CardContent>
            <div className="card-footer">
                <div className="footer-actions">
                    {device.parentId && (
                        <IconButton onClick={handleUnlinkDevice}>
                            <LinkOffIcon />
                        </IconButton>
                    )}
                    <IconButton onClick={handleRemoveDevice}>
                        <DeleteIcon />
                    </IconButton>
                    {}
                </div>
            </div>
        </Card>
    );
};

interface SpaceCardProps {
    space: SpaceVM;
    spaces: SpaceVM[];
    devices: DeviceVM[];
}

const SpaceCard: React.FC<SpaceCardProps> = (props) => {
    if (!props.space) {
        return <React.Fragment />;
    }

    const dispatch = useDispatch();

    // const spaces = !props.spaces ? [] : props.spaces;
    const devices = !props.devices ? [] : props.devices;
    const space: SpaceVM = props.space;

    // const parent = spaces.find((item) => item.id == space.parentId);

    const id = space.id;
    const icon = space.icon;
    const header = `${space.name} - ${icon.name} - ${space.id}`;

    const image = ((item: SpaceVM) => {
        if (!item.photos || !item.photos.length) {
            return {
                name: 'default',
                path: 'http://placeimg.com/640/480/technics',
            };
        }

        return item.photos[0];
    })(space);

    const handleSpaceCardSelect = () => {
        dispatch(DeviceSlice.selectSpace(props.space));
    };

    const elements = [];

    if (props.devices) {
        const device_cards = devices
            .filter((leaf) => leaf.spaceId == space.id)
            .map((leaf) => {
                return (
                    <DeviceSmallCard
                        key={leaf.id}
                        device={leaf}
                        spaces={props.spaces}
                        devices={props.devices}
                    />
                );
            });

        elements.push(...device_cards);
    }

    const accept = [
        DeviceMaintainCardTypes.DeviceTemplateCard,
        DeviceMaintainCardTypes.DeviceCard,
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
                    dispatch(DeviceSlice.placeDeviceToSpace(space));
                    return;
                }

                if (
                    item.type == DeviceMaintainCardTypes.DeviceCard ||
                    item.type == DeviceMaintainCardTypes.DeviceSmallCard
                ) {
                    dispatch(DeviceSlice.changeDeviceLocation(space));
                    return;
                }
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver({ shallow: true }),
                canDrop: !!monitor.canDrop(),
            }),
        }),
        [[space]]
    );

    const classname = clsx(
        'space-card',
        isOver ? 'is-over' : '',
        isOver && canDrop ? 'can-drop' : '',
        isOver && !canDrop ? 'cannot-drop' : ''
    );

    return (
        <React.Fragment>
            <input
                name="space-cards-selected"
                id={`label-${id}`}
                type="radio"
                hidden={true}
            />
            <label
                htmlFor={`label-${id}`}
                onClick={handleSpaceCardSelect}
                // onDoubleClick={handleSpaceCardSelect}
            >
                <Card
                    id={id}
                    ref={drop}
                    className={classname}
                    variant="outlined"
                >
                    <div className="card-header">
                        <div className="header-name">{header}</div>
                        <div className="header-actions">{'actions'}</div>
                    </div>
                    <CardContent>
                        <div className="leaves">{elements}</div>
                        <div className="preview">
                            <img src={image.path} alt={image.name} />
                        </div>
                    </CardContent>
                </Card>
            </label>
        </React.Fragment>
    );
};

export default SpaceCard;
