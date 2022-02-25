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
    const all = await Promise.all(
        device.networkCards.map(async (card) => {
            const base = `http://${card.ip}:4232`;
            const url = `/driftice/v1/bindIotCloud/${id}`;
            const params = {};
            const body = {};

            return await new AxiosFactory({ baseURL: base })
                .useHeader('token', token)
                .useBefore(() => {
                    // dispatch(FetchSlice.start());
                })
                .getInstance()
                .post<any>(url, body, { params })
                .then((res) => {
                    console.log(res.data);
                    return true;
                })
                .catch((err) => {
                    console.log(err);
                    return false;
                })
                .finally(() => {
                    // dispatch(FetchSlice.end());
                });
        })
    );

    console.log('notifyGatewayIsBound', all);
    return all
};

const GatewayBindDialog: React.FC<GatewayBindDialogProps> = (props) => {
    if (!props.connection || !props.device) {
        return <div />;
    }

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(SpaceSlice.closeBindModal());
    };

    const handleBind = async () => {
        return console.log('props.device', props.connection)
        let promises = await notifyGatewayIsBound(props.device);
        if (promises.includes(false)) {

            dispatch(SpaceSlice.closeBindModal());
            alert('ERROR!')
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
                    <div>{props.connection.imei}</div>
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
