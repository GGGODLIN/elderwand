import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { useDispatch } from 'react-redux';
import DeviceMaintainAPIs from 'src/client/domain/device/DeviceMaintainAPIs';
import DeviceVM, {
    ProjectVM,
    SpaceVM,
} from 'src/client/domain/device/DeviceVMs';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface ChangeDeviceLocationDialogProps {
    open: boolean;
    project: ProjectVM;
    device: DeviceVM;
    space: SpaceVM;
    changeSuccessCallback?: Function;
}

const ChangeDeviceLocationDialog: React.FC<ChangeDeviceLocationDialogProps> = (
    props
) => {
    if (!props.open) {
        return null;
    }

    const dispatch = useDispatch();
    const project = props.project;

    const handleClose = () => {
        dispatch(DeviceSlice.closeChangeDeviceLocationDialog());
    };

    const handleChange = () => {
        const device = { ...props.device, spaceId: props.space.id };

        DeviceMaintainAPIs.editDevice(dispatch, project, device, () => {
            DeviceMaintainAPIs.fetchDeviceTopologyResources(
                dispatch,
                props.project,
                () => {
                    dispatch(DeviceSlice.closeChangeDeviceLocationDialog());
                }
            );
        });
    };

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {'Change Device Location'}
                </DialogTitle>
                <DialogContent>
                    {}
                    <div>
                        {props.project &&
                            `${props.project.name} - ${props.project.code}`}
                    </div>
                    <div>
                        {props.space &&
                            `${props.space.name} - ${props.space.id}`}
                    </div>
                    <div>
                        {props.device &&
                            `${props.device.name} - ${props.device.id}`}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        className={'change'}
                        onClick={handleChange}
                        style={{ color: 'orange' }}
                    >
                        {'Change'}
                    </Button>
                    <Button className={'cancel'} onClick={handleClose}>
                        {'Cancel'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ChangeDeviceLocationDialog;
