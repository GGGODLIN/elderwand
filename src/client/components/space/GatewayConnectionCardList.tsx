import {
    Card,
    CardContent,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import clsx from 'clsx';
import React, { ChangeEvent, CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import GatewayConnectionVM from 'src/client/domain/space/GatewayConnectionVM';
import SpaceMaintainItemTypes from 'src/client/domain/space/SpaceMaintainItemTypes';
import { RootState } from 'src/client/reducer';
import SpaceSlice from 'src/client/slices/SpaceSlice';

interface GatewayConnectionCardProps {
    connection: GatewayConnectionVM;
}

const GatewayConnectionCard: React.FC<GatewayConnectionCardProps> = (props) => {
    const dispatch = useDispatch();

    const target = props.connection;
    const id = target.id;
    const name = target.publicIP;

    const isBound = target.isBound;

    const handleClick = (e) => {
        e.stopPropagation();
        // console.log('handleClick');
    };

    const handleDragStart = () => {
        dispatch(SpaceSlice.selectGatewayConnection(target));
    };

    const [{ isDragging }, drag] = useDrag(() => ({
        type: SpaceMaintainItemTypes.GatewayConnectionCard,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const style: CSSProperties = {
        opacity: isDragging ? 0.5 : 1,
    };

    const classname = clsx(
        'gateway-connection-card',
        isBound ? 'is-bound' : ''
    );

    return (
        <Card
            ref={isBound ? null : drag}
            style={style}
            key={id}
            className={classname}
            variant="outlined"
            onClick={handleClick}
            onDragStart={handleDragStart}
            // onDoubleClick={handleDoubleClick}
        >
            <div className="card-header">
                <div className="header-name">{`Public IP: ${name}`}</div>
                {/* <div className="header-actions">{"actions"}</div> */}
            </div>
            <CardContent>
                {/*<div>{target.imei}</div>*/}
                {target.networkCards.map((card) => {
                    return (
                        <React.Fragment key={card.id}>
                            <div>{`${card.network} ${
                                card.primary ? 'primary' : ''
                            }`}</div>
                            <div>{`${card.mac} / ${card.ip}`}</div>
                        </React.Fragment>
                    );
                })}
            </CardContent>
            <div className="card-footer">
                {/*<div className="footer-actions">{'actions'}</div>*/}
            </div>
        </Card>
    );
};

interface GatewayConnectionCardListProps {
    connections: GatewayConnectionVM[];
}

const GatewayConnectionCardList: React.FC<GatewayConnectionCardListProps> = (
    props
) => {
    const dispatch = useDispatch();

    const { client_ip } = useSelector((state: RootState) => {
        return {
            client_ip: state.space.client_ip,
        };
    });

    const cards = props.connections.map((connection) => {
        return (
            <GatewayConnectionCard
                key={connection.imei}
                connection={connection}
            />
        );
    });

    const handleClientIPChange = (e: ChangeEvent<HTMLInputElement>) => {
        const ip = e.target.value;
        dispatch(SpaceSlice.setClientIP(ip));
    };

    return (
        <div className={'gateway-connection-list'}>
            <div className={'client-ip-box'}>
                <Grid>
                    <Grid item>
                        <TextField
                            label="Client IP"
                            name="client_ip"
                            variant="outlined"
                            size="small"
                            value={client_ip || ''}
                            disabled={false}
                            fullWidth={true}
                            onChange={handleClientIPChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => {
                                                dispatch(
                                                    SpaceSlice.setClientIP(null)
                                                );
                                            }}
                                        >
                                            <RefreshIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
            </div>
            <div className={'cards'}>{cards}</div>
        </div>
    );
};

export default GatewayConnectionCardList;
