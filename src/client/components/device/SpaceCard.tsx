import { Card, CardContent, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';
import React, { CSSProperties } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import DeviceHelper from 'src/client/domain/device/DeviceHelper';
import DeviceMaintainCardTypes, {
    DeviceMaintainCardType,
    DeviceMaintainCardTypeHelper,
    DeviceTypeCategories,
} from 'src/client/domain/device/DeviceMaintainItemTypes';
import DeviceVM, {
    DeviceTemplateVM,
    ProjectVM,
    SpaceVM,
} from 'src/client/domain/device/DeviceVM';
import AssetsHelper from 'src/client/helper/AssetsHelper';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface DeviceSmallCardProp {
    project: ProjectVM;
    spaces: SpaceVM[];
    device: DeviceVM;
    devices: DeviceVM[];
}

const DeviceSmallCard: React.FC<DeviceSmallCardProp> = (props) => {
    const dispatch = useDispatch();

    if (!props.device) {
        return <React.Fragment />;
    }

    const project = props.project;
    // const spaces = !props.spaces ? [] : props.spaces;
    const devices = !props.devices ? [] : props.devices;
    const device = props.device;

    const space = props.spaces.find((space) => space.id == device.spaceId);
    const parent = props.devices.find((item) => item.id == device.parentId);
    let leaves = devices.filter((item) => item.parentId == device.id);

    if (device.type.categoryId == DeviceTypeCategories.SwitchPanel) {
        const ids = !device.switchPanelControlInfo
            ? []
            : device.switchPanelControlInfo
                .filter((info) => !!info?.connectionInfo[0]?.dvId)
                .map((info) => info.connectionInfo[0].dvId);
        leaves = devices.filter((item) => ids.includes(item.dvId));
    }

    const isBound = !!device.imei;
    let canDelete = !leaves.length;

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

    const handleEditSettings = (e) => {
        e.stopPropagation();
        const payload: DeviceVM = {
            ...device,
            project: project,
            space: space,
            parent: parent,
            leaves: leaves,
        };
        dispatch(DeviceSlice.editDeviceSetting(payload));
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
        [props.device]
    );

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: DeviceMaintainCardTypes.DeviceSmallCard,
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
            item: {
                type: DeviceMaintainCardTypes.DeviceSmallCard,
                payload: device,
            },
        }),
        [props.device]
    );

    function ref(elem) {
        drop(elem);
        drag(elem);
    }

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

    const helper = new DeviceHelper({ device });
    const name = device.name;
    const protocols = helper.getProtocols().join(',');

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
                <div className="header-actions">{ }</div>
            </div>
            <CardContent>
                <div>{device.dvId}</div>
                <div>{device.type.name}</div>
                <div>{parent ? `${parent.name} - ${parent.dvId}` : ''}</div>
            </CardContent>
            <div className="card-footer">
                <div className="footer-header">
                    {protocols}, {leaves.length}
                </div>
                <div className="footer-actions">
                    {device.parentId && (
                        <IconButton onClick={handleUnlinkDevice}>
                            <LinkOffIcon />
                        </IconButton>
                    )}
                    {
                        <IconButton onClick={handleEditSettings}>
                            <SettingsIcon />
                        </IconButton>
                    }
                    <IconButton onClick={handleRemoveDevice}>
                        <DeleteIcon />
                    </IconButton>
                    { }
                </div>
            </div>
        </Card>
    );
};

interface SpaceCardProps {
    project: ProjectVM;
    space: SpaceVM;
    spaces: SpaceVM[];
    devices: DeviceVM[];
}

const SpaceCard: React.FC<SpaceCardProps> = (props) => {
    const dispatch = useDispatch();

    if (!props.space) {
        return <React.Fragment />;
    }

    const project = props.project;
    const spaces = !props.spaces ? [] : props.spaces;
    const space: SpaceVM = props.space;
    // const parent = spaces.find((item) => item.id == space.parentId);
    const leaves = spaces.filter((item) => item.parentId == space.id);
    // const devices = !props.devices ? [] : props.devices;
    const devices = !props.devices
        ? []
        : props.devices.filter((leaf) => leaf.spaceId == space.id);

    let canDelete = !leaves.length && !devices.length;

    const elements = [];

    if (devices.length) {
        const device_cards = devices.map((leaf) => {
            return (
                <DeviceSmallCard
                    key={leaf.id}
                    project={project}
                    spaces={props.spaces}
                    device={leaf}
                    devices={props.devices}
                />
            );
        });

        elements.push(...device_cards);
    }

    const accept = [
        DeviceMaintainCardTypes.SpaceTemplateCard,
        DeviceMaintainCardTypes.SpaceCard,
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

                if (item.type == DeviceMaintainCardTypes.SpaceTemplateCard) {
                    dispatch(DeviceSlice.addSpace(space));
                    return;
                }

                if (item.type == DeviceMaintainCardTypes.SpaceCard) {
                    dispatch(
                        DeviceSlice.changeSpaceParent({
                            space: space,
                            parent: item.payload as SpaceVM,
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
        [props.space]
    );

    const item = {
        type: DeviceMaintainCardTypes.SpaceCard,
        payload: space,
    };

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: item.type,
            item: item,
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [props.space]
    );

    function ref(elem) {
        drop(elem);
        drag(elem);
    }

    const style: CSSProperties = {
        opacity: isDragging ? 0.5 : 1,
    };

    const handleStopPropagation = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleSelectSpaceCard = (e) => {
        e.stopPropagation();
        dispatch(DeviceSlice.selectSpace(space));
    };

    const handleSelectSpace = (e) => {
        e.stopPropagation();
        dispatch(DeviceSlice.selectSpace(space));
    };

    const handleRemoveSpace = (e) => {
        e.stopPropagation();
        dispatch(DeviceSlice.removeSpace(space));
    };

    const classname = clsx(
        'space-card',
        isOver ? 'is-over' : '',
        isOver && canDrop ? 'can-drop' : '',
        isOver && !canDrop ? 'cannot-drop' : ''
    );

    const id = space.id;
    const icon = space.icon;
    const header = `${space.name} - ${icon.name} - ${space.id}`;
    const image =
        !space.photos || !space.photos.length
            ? {
                name: 'default',
                path: 'http://placeimg.com/640/480/arch',
            }
            : space.photos[0];
    const path = AssetsHelper.generatePhotoPath(icon.path);

    const footer_header = `Space Count: ${leaves.length},\tDevice Count: ${devices.length}`;

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
                // onClick={handleSelectSpaceCard}
                onDoubleClick={handleSelectSpaceCard}
            >
                <Card
                    id={id}
                    ref={ref}
                    className={classname}
                    style={style}
                    variant="outlined"
                // onMouseDown={handleSelectSpace}
                // onDragStart={handleSelectSpace}
                >
                    <div className="card-header">
                        <div className="header-name">{header}</div>
                        <div
                            className="header-actions"
                            onDoubleClick={handleStopPropagation}
                        >
                            <IconButton onClick={handleRemoveSpace}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                    <CardContent>
                        <div className="leaves">{elements}</div>
                        <div className="preview">
                            <img src={image.path} alt={image.name} />
                        </div>
                    </CardContent>
                    <div className="card-footer">
                        <div className="footer-header">{footer_header}</div>
                        <div className="footer-actions">{ }</div>
                    </div>
                </Card>
            </label>
        </React.Fragment>
    );
};

export default SpaceCard;
