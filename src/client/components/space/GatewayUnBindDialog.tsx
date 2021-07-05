import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { useDispatch } from 'react-redux';
import ProjectVM from 'src/client/domain/project/ProjectVM';
import { DeviceVM } from 'src/client/domain/space/SpaceVM';
import AxiosFactory from 'src/client/helper/AxiosFactory';
import FetchSlice from 'src/client/slices/FetchSlice';
import SpaceSlice from 'src/client/slices/SpaceSlice';

interface GatewayBindDialogProps {
    open: boolean;
    project: ProjectVM;
    device: DeviceVM;
    boundCallback?: Function;
}

const GatewayUnBindDialog: React.FC<GatewayBindDialogProps> = (props) => {
    if (!props.device) {
        return <div />;
    }

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(SpaceSlice.closeUnBindModal());
    };

    const handleUnBind = () => {
        const url = `/api/devices/${props.device.id}/gateway`;

        const params = {
            projectId: props.project.id,
        };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .delete<DeviceVM>(url, { params })
            .then((res) => {
                dispatch(SpaceSlice.closeUnBindModal());
                props.boundCallback();
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
                    {'UnBind Gateway Connection'}
                </DialogTitle>
                <DialogContent>
                    <div>{props.device.name}</div>
                </DialogContent>
                <DialogActions>
                    <Button
                        className={'unbind'}
                        onClick={handleUnBind}
                        style={{ color: 'red' }}
                    >
                        {'UnBind'}
                    </Button>
                    <Button className={'cancel'} onClick={handleClose}>
                        {'Cancel'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default GatewayUnBindDialog;
