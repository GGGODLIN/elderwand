import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { useDispatch } from 'react-redux';
import ProjectVM from 'src/client/domain/project/ProjectVM';
import GatewayConnectionVM from 'src/client/domain/space/GatewayConnectionVM';
import { DeviceVM } from 'src/client/domain/space/SpaceVM';
import AxiosFactory from 'src/client/helper/AxiosFactory';
import FetchSlice from 'src/client/slices/FetchSlice';
import SpaceSlice from 'src/client/slices/SpaceSlice';

interface GatewayBindDialogProps {
    open: boolean;
    project: ProjectVM;
    device: DeviceVM;
    connection: GatewayConnectionVM;
    boundCallback?: Function;
}

const notifyGatewayIsBound = async (device: DeviceVM) => {
    // http://{{GATEWAY_IP}}:4232/driftice/v1/bindIotCloud/{{GATEWAY_DVID}}
    const token = 'icjUOsDkUO46k6b8vlypIjrMNENe9V6I'; // TODO dynamic
    const id = device.dvId;
    let sortedNetworkCards = device.networkCards?.sort?.((a, b) => {
        if (a?.primary)
            return -1
        if (b?.primary)
            return 0
        return 0
    })
    console.log('notifyGatewayIsBound card', sortedNetworkCards)
    let response = { isOk: false, res: null }
    for (let index = 0; index < sortedNetworkCards?.length; index++) {
        const card = sortedNetworkCards[index];
        const base = `http://${card.ip}:4232`;
        const url = `/driftice/v1/bindIotCloud/${id}`;
        const params = {};
        const body = {};
        let result = await new AxiosFactory({ baseURL: base })
            .useHeader('token', token)
            .useBefore(() => {
                // dispatch(FetchSlice.start());
            })
            .getInstance()
            .post<any>(url, body, { params })
            .then((res) => {
                console.log(res.data);
                return { isOk: true, res: res };
            })
            .catch((err) => {
                console.log(err);
                return { isOk: false, res: err };
            })
            .finally(() => {
                // dispatch(FetchSlice.end());
            });
        response = result
        if (result?.isOk || result?.res?.response?.data?.errMsg) {
            break
        }
    }
    // const all = await Promise.all(
    //     device.networkCards.map(async (card) => {
    //         const base = `http://${card.ip}:4232`;
    //         const url = `/driftice/v1/bindIotCloud/${id}`;
    //         const params = {};
    //         const body = {};

    //         return await new AxiosFactory({ baseURL: base })
    //             .useHeader('token', token)
    //             .useBefore(() => {
    //                 // dispatch(FetchSlice.start());
    //             })
    //             .getInstance()
    //             .post<any>(url, body, { params })
    //             .then((res) => {
    //                 console.log(res.data);
    //                 return { isOk: true, res: res };
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 return { isOk: false, res: err };
    //             })
    //             .finally(() => {
    //                 // dispatch(FetchSlice.end());
    //             });
    //     })
    // );

    console.log('notifyGatewayIsBound', response);
    return response
};

const makeUDPs = (connection: GatewayConnectionVM, device: DeviceVM) => {
    //connection
}

const GatewayBindDialog: React.FC<GatewayBindDialogProps> = (props) => {
    if (!props.connection || !props.device) {
        return <div />;
    }

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(SpaceSlice.closeBindModal());
    };

    const handleBind = async () => {
        //return console.log('props.device', props.connection, props.device)
        dispatch(FetchSlice.start());
        let response = await notifyGatewayIsBound({ ...props.device, networkCards: [...props?.connection?.networkCards] });
        dispatch(FetchSlice.end());
        if (!response?.isOk) {

            dispatch(SpaceSlice.closeBindModal());
            alert(`ERROR!  ${response?.res?.response?.data?.errMsg ?? response?.res}`)
            return
        }
        const url = `/api/devices/${props.device.id}/gateway`;

        const params = {
            projectId: props.project.id,
        };

        const body = {
            cid: props.connection.id,
        };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .put<DeviceVM>(url, body, { params })
            .then((res) => {

                dispatch(SpaceSlice.closeBindModal());
                props.boundCallback();
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    const open = props.open;
    console.log('props.device', props.connection)
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {'Gateway Connection Binding'}
                </DialogTitle>
                <DialogContent>
                    <div>{props.device.name}</div>
                    <div>{props.connection.publicIP}</div>
                    {props.connection.networkCards.map((card) => {
                        return (
                            <React.Fragment key={card.id}>
                                <div>{`${card.network} ${card.primary ? 'primary' : ''
                                    }`}</div>
                                <div>{`${card.mac} / ${card.ip}`}</div>
                            </React.Fragment>
                        );
                    })}
                </DialogContent>
                <DialogActions>
                    <Button
                        className={'bind'}
                        onClick={handleBind}
                        style={{ color: 'blue' }}
                    >
                        {'Bind'}
                    </Button>
                    <Button className={'cancel'} onClick={handleClose}>
                        {'Cancel'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default GatewayBindDialog;
