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
import AssetsHelper from 'src/client/helper/AssetsHelper';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface DeviceSmallCardProp {
    device: DeviceVM;
    spaces: SpaceVM[];
    devices: DeviceVM[];
}

const DeviceSmallCard: React.FC<DeviceSmallCardProp> = (props) => {
    const dispatch = useDispatch();

    if (!props.device) {
        return <React.Fragment />;
    }

    const spaces = !props.spaces ? [] : props.spaces;
    const devices = !props.devices ? [] : props.devices;
    const device = props.device;

    const space = spaces.find((space) => space.id == device.spaceId);
    const parent = devices.find((item) => item.id == device.parentId);

    let canDelete = false;

    if (!props.devices) {
        const children = devices.filter((leaf) => leaf.parentId == device.id);

        if (!children.length) {
            canDelete = true;
        }
    }

    const name = device.name;
    const isBound = !!device.imei;

    const handleClick = (e) => {
        e.stopPropagation();
    };

    const handleDoubleClick = (e) => {
        e.stopPropagation();
        dispatch(DeviceSlice.selectDevice(device));
    };

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

    const handleRemoveDevice = (e) => {
        e.preventDefault();
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
            drop: (item: any, monitor) => {
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
                isOver: !!monitor.isOver({ shallow: true }),
                canDrop: !!monitor.canDrop(),
            }),
        }),
        [device]
    );

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: DeviceMaintainCardTypes.DeviceSmallCard,
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            item: {
                type: DeviceMaintainCardTypes.DeviceSmallCard,
                payload: device,
            },
        }),
        [device]
    );

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
                {/*<div>{device.type.name}</div>*/}
                <div>{parent ? `${parent.name} - ${parent.dvId}` : ''}</div>
                <div>{space ? `${space.name}` : ''}</div>
                {}
            </CardContent>
            <div className="card-footer">
                <div className="footer-actions">
                    {device.parentId && (
                        <IconButton onClick={handleUnlinkDevice}>
                            <LinkOffIcon />
                        </IconButton>
                    )}
                    {canDelete && (
                        <IconButton onClick={handleRemoveDevice}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </div>
            </div>
        </Card>
    );
};

interface DeviceCardProp {
    device: DeviceVM;
    spaces: SpaceVM[];
    devices: DeviceVM[];
}

const DeviceCard: React.FC<DeviceCardProp> = (props) => {
    const dispatch = useDispatch();

    if (!props.device) {
        return <React.Fragment />;
    }

    const devices = !props.devices ? [] : props.devices;
    const device = props.device;
    const parent = devices.find((item) => item.id == device.parentId);

    let canDelete = true;

    const elements = [];

    if (props.devices) {
        const device_cards = devices
            .filter((leaf) => leaf.parentId == device.id)
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

        if (device_cards.length) {
            canDelete = false;
        }
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
                    type: DeviceMaintainCardTypes.DeviceCard,
                    payload: device as DeviceVM,
                };
                return DeviceMaintainCardTypeHelper.canDrop(item, target);
            },
            drop: (
                item: {
                    type: string;
                    payload: DeviceTemplateVM | DeviceVM;
                },
                monitor
            ) => {
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
                isOver: !!monitor.isOver({ shallow: true }),
                canDrop: !!monitor.canDrop(),
            }),
        }),
        [device]
    );

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: DeviceMaintainCardTypes.DeviceCard,
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            item: {
                type: DeviceMaintainCardTypes.DeviceCard,
                payload: device,
            },
        }),
        [device]
    );

    const style: CSSProperties = {
        opacity: isDragging ? 0.5 : 1,
    };

    const handleStopPropagation = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleSelectDeviceCard = (e) => {
        e.stopPropagation();
        dispatch(DeviceSlice.selectDevice(device));
    };

    const handleSelectDevice = (e) => {
        e.stopPropagation();
        dispatch(DeviceSlice.selectDevice(device));
    };

    const handleRemoveDevice = () => {
        dispatch(DeviceSlice.removeDevice(device));
    };

    function ref(elem) {
        drop(elem);
        drag(elem);
    }

    const isBound = !!device.imei;

    const classname = clsx(
        'device-card',
        device.type.categoryId,
        isOver ? 'is-over' : '',
        isOver && canDrop ? 'can-drop' : '',
        isOver && !canDrop ? 'cannot-drop' : '',
        isBound ? 'is-bound' : ''
    );

    const id = device.id;
    const icon = device.icon;
    const name = `${device.name} - ${device.dvId} - ${device.id} - ${icon.name}`;
    const header = !parent
        ? `${name}`
        : `${name} - ${parent.name} - ${parent.dvId} - ${parent.id}`;

    const image =
        !device.images || !device.images.length
            ? {
                  name: 'default',
                  path: 'http://placeimg.com/640/480/technics',
              }
            : device.images[0];

    const path = AssetsHelper.generateImagePath(['device', image.path]);

    return (
        <React.Fragment>
            <input
                name="device-cards-selected"
                id={`label-${id}`}
                type="radio"
                hidden={true}
            />
            <label
                htmlFor={`label-${id}`}
                onClick={handleSelectDeviceCard}
                // onDoubleClick={handleSpaceCardSelect}
            >
                <Card
                    id={id}
                    ref={ref}
                    className={classname}
                    style={style}
                    variant="outlined"
                    onMouseDown={handleSelectDevice}
                >
                    <div className="card-header">
                        <div className="header-name">{header}</div>
                        <div
                            className="header-actions"
                            onDoubleClick={handleStopPropagation}
                        >
                            {canDelete && (
                                <IconButton onClick={handleRemoveDevice}>
                                    <DeleteIcon />
                                </IconButton>
                            )}
                            {}
                        </div>
                    </div>
                    <CardContent>
                        <div className="leaves">{elements}</div>
                        <div className="preview">
                            <img src={path} alt={image.name} />
                        </div>
                    </CardContent>
                </Card>
            </label>
        </React.Fragment>
    );
};

export default DeviceCard;
