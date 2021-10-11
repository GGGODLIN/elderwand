import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { useDispatch } from 'react-redux';
import DeviceMaintainAPIs from 'src/client/domain/device/DeviceMaintainAPIs';
import DeviceVM, { ProjectVM } from 'src/client/domain/device/DeviceVM';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface RemoveDeviceDialogProps {
    open: boolean;
    project: ProjectVM;
    device: DeviceVM;
    removeSuccessCallback?: Function;
}

const RemoveDeviceDialog: React.FC<RemoveDeviceDialogProps> = (props) => {
    const dispatch = useDispatch();

    const device = props.device;
    const project = props.project;

    if (!props.open) {
        return null;
    }

    const handleClose = () => {
        dispatch(DeviceSlice.closeRemoveDeviceDialog());
    };

    const handleRemove = () => {
        DeviceMaintainAPIs.removeDevice(dispatch, project, device, () => {
            DeviceMaintainAPIs.fetchDeviceTopologyResources(
                dispatch,
                props.project,
                () => {
                    dispatch(DeviceSlice.closeRemoveDeviceDialog());
                }
            );
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
                    {'Remove Device'}
                </DialogTitle>
                <DialogContent>
                    {}
                    <div>{`${props.project.name} - ${props.project.code}`}</div>
                    <div>{`${props.device.name} - ${props.device.id}`}</div>
                </DialogContent>
                <DialogActions>
                    <Button
                        className={'remove'}
                        onClick={handleRemove}
                        style={{ color: 'red' }}
                    >
                        {'Remove'}
                    </Button>
                    <Button className={'cancel'} onClick={handleClose}>
                        {'Cancel'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RemoveDeviceDialog;
