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

interface ChangeDeviceParentDialogProps {
    open: boolean;
    project: ProjectVM;
    device: DeviceVM;
    parent: DeviceVM;
    changeSuccessCallback?: Function;
}

const ChangeDeviceParentDialog: React.FC<ChangeDeviceParentDialogProps> = (
    props
) => {
    if (!props.open) {
        return null;
    }

    const dispatch = useDispatch();
    const project = props.project;

    const handleClose = () => {
        dispatch(DeviceSlice.closeChangeDeviceParentDialog());
    };

    const handleChange = () => {
        const device: DeviceVM = {
            ...props.device,
            parentId: !props.parent ? null : props.parent.id,
        };

        DeviceMaintainAPIs.editDeviceProfile(dispatch, project, device, () => {
            DeviceMaintainAPIs.fetchDeviceTopologyResources(
                dispatch,
                props.project,
                () => {
                    dispatch(DeviceSlice.closeChangeDeviceParentDialog());
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
                    {'Change Device Parent'}
                </DialogTitle>
                <DialogContent>
                    {}
                    <div>
                        {props.project &&
                            `${props.project.name} - ${props.project.code}`}
                    </div>
                    <div>
                        {props.parent &&
                            `${props.parent.name} - ${props.parent.id}`}
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
export default ChangeDeviceParentDialog;
