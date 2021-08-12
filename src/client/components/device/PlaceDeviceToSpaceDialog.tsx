import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { useDispatch } from 'react-redux';
import DeviceMaintainAPIs, {
    PlaceDeviceToSpaceOptions,
} from 'src/client/domain/device/DeviceMaintainAPIs';
import {
    DeviceTemplateVM,
    ProjectVM,
    SpaceVM,
} from 'src/client/domain/device/DeviceVMs';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface PlaceDeviceToSpaceDialogProps {
    open: boolean;
    template: DeviceTemplateVM;
    project: ProjectVM;
    space: SpaceVM;
    appendSuccessCallback?: Function;
}

const PlaceDeviceToSpaceDialog: React.FC<PlaceDeviceToSpaceDialogProps> = (
    props
) => {
    const dispatch = useDispatch();

    if (!props.open) {
        return null;
    }

    const handleClose = () => {
        dispatch(DeviceSlice.closePlaceDeviceToSpaceDialog());
    };

    const handlePlace = () => {
        const options: PlaceDeviceToSpaceOptions = {
            templateId: props.template.id,
            spaceId: props.space.id,
        };
        DeviceMaintainAPIs.placeDeviceToSpace(
            dispatch,
            props.project,
            options,
            () => {
                DeviceMaintainAPIs.fetchDeviceTopologyResources(
                    dispatch,
                    props.project,
                    () => {
                        dispatch(DeviceSlice.closePlaceDeviceToSpaceDialog());
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
                    {'Place Device To Space'}
                </DialogTitle>
                <DialogContent>
                    {}
                    <div>{`${props.project.name} - ${props.project.code}`}</div>
                    <div>{`${props.space.name} - ${props.space.id}`}</div>
                    <div>{`${props.template.name} - ${props.template.id}`}</div>
                    {/*<div>{props.connection.imei}</div>*/}
                </DialogContent>
                <DialogActions>
                    <Button
                        className={'append'}
                        onClick={handlePlace}
                        style={{ color: 'blue' }}
                    >
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

export default PlaceDeviceToSpaceDialog;
