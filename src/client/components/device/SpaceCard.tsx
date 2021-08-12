import { Card, CardContent, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
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
    devices: DeviceVM[];
    spaces: SpaceVM[];
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
        item: {
            type: DeviceMaintainCardTypes.DeviceSmallCard,
            payload: device,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
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
            onDragStart={handleDragStart}
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
    const dispatch = useDispatch();
    const handleSpaceCardSelect = () => {
        dispatch(DeviceSlice.selectSpace(props.space));
    };

    const space: SpaceVM = props.space;

    const image = ((item: SpaceVM) => {
        if (!item.photos || !item.photos.length) {
            return {
                name: 'default',
                path: 'http://placeimg.com/640/480/technics',
            };
        }

        return item.photos[0];
    })(space);

    // const elements = [];
    const leaves = props.devices.filter((leaf) => leaf.spaceId == space.id);
    const elements = leaves.map((leaf) => {
        return (
            <DeviceSmallCard
                key={leaf.id}
                device={leaf}
                devices={props.devices}
                spaces={props.spaces}
            />
        );
    });

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
        [[props.devices, props.spaces]]
    );

    const classname = clsx(
        'space-card',
        isOver ? 'is-over' : '',
        isOver && canDrop ? 'can-drop' : '',
        isOver && !canDrop ? 'cannot-drop' : ''
    );

    const id = space.id;
    const icon = space.icon;
    const header = `${space.name} - ${icon.name} - ${space.id}`;

    return (
        <React.Fragment>
            <input
                name="space-cards-selected"
                id={id}
                type="radio"
                hidden={true}
            />
            <label
                htmlFor={id}
                // onClick={handleSpaceCardSelect}
                onDoubleClick={handleSpaceCardSelect}
            >
                <Card ref={drop} className={classname} variant="outlined">
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
