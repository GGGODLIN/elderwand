import { Card, CardContent } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import ProjectVM from 'src/client/domain/project/ProjectVM';
import SpaceVM, {
    DeviceVM,
    SpaceTopology,
} from 'src/client/domain/space/SpaceVM';
import SpaceMaintainItemTypes from 'src/client/domain/space/SpaceMaintainItemTypes';
import SpaceSlice from 'src/client/slices/SpaceSlice';
import LinkOffIcon from '@material-ui/icons/LinkOff';

interface SpaceSmallCardProp {
    space: SpaceVM;
    onSelectSmallCard?: Function;
}

const SpaceSmallCard: React.FC<SpaceSmallCardProp> = (props) => {
    const target = props.space;
    const id = target.id;
    const name = target.name;

    const handleDoubleClick = (e) => {
        e.stopPropagation();
        if (!!props.onSelectSmallCard) {
            props.onSelectSmallCard(target);
        }
    };

    return (
        <Card
            key={id}
            className={'space-xs-card'}
            variant="outlined"
            // onClick={handleClick}
            onDoubleClick={handleDoubleClick}
        >
            <div className="card-header">
                <div className="header-name">{name}</div>
                {/* <div className="header-actions">{"actions"}</div> */}
            </div>
            <CardContent>
                {/* <div className="leaves">{elements}</div> */}
                {/* <img src={"http://placeimg.com/640/480/technics"} alt="" /> */}
                {/* <div>{"images"}</div> */}
                <div>{'space count'}</div>
                <div>{'device count'}</div>
            </CardContent>
            <div className="card-footer">
                <div className="footer-actions">{'actions'}</div>
            </div>
        </Card>
    );
};

interface SpaceCardProp {
    space: SpaceVM;
    onSelectCard?: Function;
    onSelectSmallCard?: Function;
}

const SpaceCard: React.FC<SpaceCardProp> = (props) => {
    const space = props.space;

    const handleSpaceCardSelect = (e) => {
        e.stopPropagation();
        if (!!props.onSelectCard) {
            props.onSelectCard(space);
        }
    };

    const id = space.id;
    const icon = space.icon;
    const name = `${space.name} - ${icon.name} - ${space.id}`;
    const image = ((item: SpaceVM) => {
        if (!item.photos || !item.photos.length) {
            return {
                name: 'default',
                path: 'http://placeimg.com/640/480/technics',
            };
        }

        return item.photos[0];
    })(space);

    const elements = [];

    if (Array.isArray(space.leaves)) {
        const space_cards = space.leaves.map((item) => {
            return (
                <SpaceSmallCard
                    key={item.id}
                    space={item}
                    onSelectSmallCard={props.onSelectSmallCard}
                />
            );
        });

        elements.push(...space_cards);
    }

    if (Array.isArray(space.devices)) {
        const device_cards = space.devices.map((item) => {
            return (
                <DeviceSmallCard
                    key={item.id}
                    device={item}
                    onSelectSmallCard={props.onSelectSmallCard}
                />
            );
        });

        elements.push(...device_cards);
    }

    return (
        <React.Fragment>
            <input
                name="space-cards-selected"
                id={id}
                type="radio"
                hidden={true}
            />
            <label htmlFor={id} onClick={handleSpaceCardSelect}>
                <Card className={'space-card'} variant="outlined">
                    <div className="card-header">
                        <div className="header-name">{name}</div>
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

interface DeviceSmallCardProp {
    device: DeviceVM;
    onSelectSmallCard?: Function;
}

const DeviceSmallCard: React.FC<DeviceSmallCardProp> = (props) => {
    const dispatch = useDispatch();

    const device = props.device;
    const id = device.id;
    const name = device.name;
    const isBound = !!device.imei;
    const isGateway = device.type.categoryId == 'GW';

    const handleClick = (e) => {
        e.stopPropagation();
        // console.log('handleClick');
    };

    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: isGateway
                ? SpaceMaintainItemTypes.GatewayConnectionCard
                : SpaceMaintainItemTypes.None,
            drop: () => {
                dispatch(SpaceSlice.selectGateway(device));
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            }),
        }),
        [device]
    );

    const classname = clsx(
        'device-xs-card',
        device.type.categoryId,
        isOver ? 'is-over' : '',
        isOver && !canDrop ? 'cannot-drop' : '',
        isBound ? 'is-bound' : ''
    );

    return (
        <Card
            ref={isBound ? null : drop}
            key={id}
            id={id}
            className={classname}
            variant="outlined"
            onClick={handleClick}
            // onDoubleClick={handleDoubleClick}
        >
            <div className="card-header">
                <div className="header-name">{name}</div>
                {/* <div className="header-actions">{"actions"}</div> */}
            </div>
            <CardContent>
                <div>{device.dvId}</div>
                <div>{device.type.name}</div>
                <div>{device.publicIP}</div>
            </CardContent>
            <div className="card-footer">
                <div className="footer-actions">
                    {isGateway && isBound && (
                        <a
                            onClick={() => {
                                dispatch(SpaceSlice.openUnBindModal(device));
                            }}
                        >
                            <LinkOffIcon />
                        </a>
                    )}
                    {'actions'}
                </div>
            </div>
        </Card>
    );
};

interface DeviceCardProp {
    device: DeviceVM;
    onSelectCard?: Function;
    onSelectSmallCard?: Function;
}

const DeviceCard: React.FC<DeviceCardProp> = (props) => {
    const dispatch = useDispatch();

    const device = props.device;

    const handleSelectCard = (e) => {
        e.stopPropagation();
        if (!!props.onSelectCard) {
            props.onSelectCard(device);
        }
    };

    const id = device.id;
    const icon = device.icon;
    const name = `${device.name} - ${icon.name} - ${device.dvId}`;
    const image = ((item: DeviceVM) => {
        if (!item.images || !item.images.length) {
            return {
                name: 'default',
                path: 'http://placeimg.com/640/480/technics',
            };
        }

        return item.images[0];
    })(device);

    const isBound = !!device.imei;
    const isGateway = device.type.categoryId == 'GW';

    let elements = [];

    if (Array.isArray(device.leaves)) {
        const device_cards = device.leaves.map((item) => {
            return (
                <DeviceSmallCard
                    key={item.id}
                    device={item}
                    onSelectSmallCard={props.onSelectSmallCard}
                />
            );
        });
        elements.push(...device_cards);
    }

    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: isGateway
                ? SpaceMaintainItemTypes.GatewayConnectionCard
                : SpaceMaintainItemTypes.None,
            drop: () => {
                dispatch(SpaceSlice.selectGateway(device));
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            }),
        }),
        [device]
    );

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
                    ref={isBound ? null : drop}
                    className={classname}
                    variant="outlined"
                >
                    {/* <div id={item.id} /> */}
                    <div className="card-header">
                        <div className="header-name">{name}</div>
                        <div className="header-actions">
                            {isGateway && isBound && (
                                <a
                                    onClick={() => {
                                        dispatch(
                                            SpaceSlice.openUnBindModal(device)
                                        );
                                    }}
                                >
                                    <LinkOffIcon />
                                </a>
                            )}
                            {'actions'}
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

function getTopology(
    target: SpaceVM,
    source: SpaceVM[],
    space_topology_map: { [key: string]: SpaceTopology }
) {
    let root: SpaceVM = target;

    while (true) {
        const parent = source.find((space) => space.id == root.parentId);

        if (!parent) {
            break;
        }

        root = parent;
    }

    return space_topology_map[root.id];
}

const getNodeDevices = (
    target: SpaceVM,
    source: SpaceVM[],
    space_topology_map: { [key: string]: SpaceTopology }
): DeviceVM[] => {
    const topology = getTopology(target, source, space_topology_map);

    if (!topology) {
        return [];
    }

    const node = topology.nodes.find((node) => node.id == target.id);

    return !node ? [] : node.devices;
};

interface SpaceCardListProp {
    project_selected: ProjectVM;
    space_selected: SpaceVM;
    spaces: SpaceVM[];
    space_topology_map: { [key: string]: SpaceTopology };
    onSelectCard?: Function;
    onSelectSmallCard?: Function;
}

const SpaceCardStyleList: React.FC<SpaceCardListProp> = (props) => {
    if (!props.project_selected) {
        return <div>{'No Select Project.'}</div>;
    }

    const spaces = !props.space_selected
        ? props.spaces.filter((item) => {
              if (!item.parentId) {
                  return item;
              }
          })
        : props.spaces.filter((item) => {
              if (props.space_selected.id == item.parentId) {
                  return item;
              }
          });

    for (let i = 0; i < spaces.length; i++) {
        const space = spaces[i];

        const leaves = props.spaces.filter((item) => {
            if (space.id == item.parentId) {
                return item;
            }
        });

        const devices = getNodeDevices(
            space,
            props.spaces,
            props.space_topology_map
        );

        spaces[i] = {
            ...space,
            leaves: leaves,
            devices: devices,
        };
    }

    const cards = spaces.map((space) => {
        return (
            <React.Fragment key={space.id}>
                <SpaceCard
                    space={space}
                    onSelectCard={props.onSelectCard}
                    onSelectSmallCard={props.onSelectSmallCard}
                >
                    {/*{elements}*/}
                </SpaceCard>
            </React.Fragment>
        );
    });

    if (props.space_selected) {
        const devices = getNodeDevices(
            props.space_selected,
            props.spaces,
            props.space_topology_map
        );

        const topology = getTopology(
            props.space_selected,
            props.spaces,
            props.space_topology_map
        );

        const device_cards = devices.map((item) => {
            const leaves = [];

            for (const node of topology.nodes) {
                for (const leaf of node.devices) {
                    if (leaf.parentId == item.id) {
                        leaves.push(leaf);
                    }
                }
            }

            const device: DeviceVM = {
                ...item,
                leaves: leaves,
            };

            return (
                <React.Fragment key={device.id}>
                    <DeviceCard device={device} />
                </React.Fragment>
            );
        });

        cards.push(...device_cards);
    }

    const header = !props.space_selected
        ? `${props.project_selected.name} - ${props.project_selected.code} - ${props.project_selected.id}`
        : `${props.space_selected.name} - ${props.space_selected.id}`;

    return (
        <div className={'root-card'}>
            <div className="card-header">{header}</div>
            <div className="card-list">{cards}</div>
        </div>
    );
};

export default SpaceCardStyleList;
