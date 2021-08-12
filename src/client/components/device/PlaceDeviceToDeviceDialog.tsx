import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { useDispatch } from 'react-redux';
import DeviceMaintainAPIs, {
    PlaceDeviceToDeviceOptions,
} from 'src/client/domain/device/DeviceMaintainAPIs';
import DeviceVM, {
    DeviceTemplateVM,
    ProjectVM,
} from 'src/client/domain/device/DeviceVMs';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface PlaceDeviceToDeviceDialogProps {
    open: boolean;
    template: DeviceTemplateVM;
    project: ProjectVM;
    device: DeviceVM;
    appendSuccessCallback?: Function;
}

const PlaceDeviceToDeviceDialog: React.FC<PlaceDeviceToDeviceDialogProps> = (
    props
) => {
    const dispatch = useDispatch();

    if (!props.open) {
        return null;
    }

    const handleClose = () => {
        dispatch(DeviceSlice.closePlaceDeviceToDeviceDialog());
    };

    const handlePlace = () => {
        const options: PlaceDeviceToDeviceOptions = {
            templateId: props.template.id,
            spaceId: props.device.spaceId,
            parentId: props.device.id,
        };

        DeviceMaintainAPIs.placeDeviceToDevice(
            dispatch,
            props.project,
            options,
            () => {
                DeviceMaintainAPIs.fetchDeviceTopologyResources(
                    dispatch,
                    props.project,
                    () => {
                        dispatch(DeviceSlice.closePlaceDeviceToDeviceDialog());
                    }
                );
            }
        );
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
                    {'Place Device To Device'}
                </DialogTitle>
                <DialogContent>
                    {}
                    <div>{`${props.project.name} - ${props.project.code}`}</div>
                    <div>{`${props.template.name} - ${props.template.id}`}</div>
                    <div>{`${props.device.name} - ${props.device.id}`}</div>
                    {/*<div>{props.connection.imei}</div>*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePlace} style={{ color: 'blue' }}>
                        {'Place'}
                    </Button>
                    <Button className={'cancel'} onClick={handleClose}>
                        {'Cancel'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PlaceDeviceToDeviceDialog;
