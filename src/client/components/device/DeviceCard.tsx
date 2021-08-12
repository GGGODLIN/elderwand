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
    DeviceTypeCategories,
} from 'src/client/domain/device/DeviceMaintainItemTypes';
import DeviceVM, {
    DeviceTemplateVM,
    SpaceVM,
} from 'src/client/domain/device/DeviceVMs';
import SpaceMaintainItemTypes from 'src/client/domain/space/SpaceMaintainItemTypes';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface DeviceSmallCardProp {
    device: DeviceVM;
    spaces: SpaceVM[];
    devices: DeviceVM[];
}

const DeviceSmallCard: React.FC<DeviceSmallCardProp> = (props) => {
    const dispatch = useDispatch();

    const device = props.device;

    const space = props.spaces.find((space) => space.id == device.spaceId);
    const parent = props.devices.find((item) => item.id == device.parentId);

    // const id = device.id;
    const name = device.name;
    const isBound = !!device.imei;
    // const isGateway = device.type.categoryId == 'GW';

    const handleClick = (e) => {
        e.stopPropagation();
    };

    const handleDoubleClick = (e) => {
        e.stopPropagation();
        dispatch(DeviceSlice.selectSpace(space));
        dispatch(DeviceSlice.selectDevice(device));
    };

    const handleUnlinkDevice = (e) => {
        e.stopPropagation();
        dispatch(DeviceSlice.unlinkParentDevice(device));
    };

    const handleRemoveDevice = (e) => {
        e.stopPropagation();
        dispatch(DeviceSlice.removeDevice(device));
    };

    const accept = [];

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

    const [{ isDragging }, drag] = useDrag(() => ({
        type: DeviceMaintainCardTypes.DeviceSmallCard,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
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
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        >
            <div className="card-header">
                <div className="header-name">{name}</div>
                <div className="header-actions">{}</div>
            </div>
            <CardContent>
                <div>{device.dvId}</div>
                <div>{device.type.name}</div>
                {/*<div>{parent ? `${parent.name} - ${parent.dvId}` : ''}</div>*/}
                <div>{space ? `${space.name}` : ''}</div>
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

interface DeviceCardProp {
    device: DeviceVM;
    spaces: SpaceVM[];
    devices: DeviceVM[];
}

const DeviceCard: React.FC<DeviceCardProp> = (props) => {
    const dispatch = useDispatch();

    const device = props.device;
    const parent = props.devices.find((item) => item.id == device.parentId);

    const id = device.id;
    const icon = device.icon;
    const name = `${device.name} - ${device.dvId} - ${device.id} - ${icon.name}`;
    const header = !parent
        ? `${name}`
        : `${name} - ${parent.name} - ${parent.dvId} - ${parent.id}`;

    const image = ((item: DeviceVM) => {
        if (!item.images || !item.images.length) {
            return {
                name: 'default',
                path: 'http://placeimg.com/640/480/technics',
            };
        }

        return item.images[0];
    })(device);

    const leaves = props.devices.filter((leaf) => leaf.parentId == device.id);
    const elements = !leaves.length
        ? []
        : leaves.map((leaf) => {
              return (
                  <DeviceSmallCard
                      key={leaf.id}
                      device={leaf}
                      spaces={props.spaces}
                      devices={props.devices}
                  />
              );
          });

    // const isGateway = device.type.categoryId == 'GW';
    const isBound = !!device.imei;

    const handleSelectCard = (e) => {
        e.stopPropagation();
        dispatch(DeviceSlice.selectDevice(device));
    };

    const handleDragStart = () => {
        dispatch(DeviceSlice.selectDevice(device));
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
                    type: DeviceMaintainCardTypes.DeviceCard,
                    payload: device,
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
        [props.devices, props.spaces]
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

    function ref(elem) {
        drop(elem);
        drag(elem);
    }

    const classname = clsx(
        'device-card',
        device.type.categoryId,
        isOver ? 'is-over' : '',
        isOver && canDrop ? 'can-drop' : '',
        isOver && !canDrop ? 'cannot-drop' : '',
        isBound ? 'is-bound' : ''
    );

    return (
        <React.Fragment>
            <input
                name="device-cards-selected"
                id={id}
                type="radio"
                hidden={true}
            />
            <label htmlFor={id} onClick={handleSelectCard}>
                <Card
                    ref={ref}
                    className={classname}
                    style={style}
                    variant="outlined"
                    onDragStart={handleDragStart}
                >
                    <div className="card-header">
                        <div className="header-name">{header}</div>
                        <div className="header-actions">
                            <IconButton onClick={handleRemoveDevice}>
                                <DeleteIcon />
                            </IconButton>
                            {}
                        </div>
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

export default DeviceCard;
