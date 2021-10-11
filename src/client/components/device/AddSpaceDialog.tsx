import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { useDispatch } from 'react-redux';
import DeviceMaintainAPIs, {
    AddSpaceOptions,
} from 'src/client/domain/device/DeviceMaintainAPIs';
import {
    ProjectVM,
    SpaceTemplateVM,
    SpaceVM,
} from 'src/client/domain/device/DeviceVM';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface AddSpaceDialogProps {
    open: boolean;
    project: ProjectVM;
    template: SpaceTemplateVM;
    space: SpaceVM;
}

const AddSpaceDialog: React.FC<AddSpaceDialogProps> = (props) => {
    if (!props.open) {
        return null;
    }

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(DeviceSlice.closeAddSpaceDialog());
    };

    const handleAddSpace = () => {
        const options: AddSpaceOptions = {
            templateId: props.template.id,
            parentId: !props.space ? null : props.space.id,
        };

        DeviceMaintainAPIs.addSpace(dispatch, props.project, options, () => {
            DeviceMaintainAPIs.fetchDeviceTopologyResources(
                dispatch,
                props.project,
                () => {
                    dispatch(DeviceSlice.closeAddSpaceDialog());
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
                <DialogTitle id="form-dialog-title">{'Add Space'}</DialogTitle>
                <DialogContent>
                    <div>{`${props.project.name} - ${props.project.code}`}</div>
                    <div>{`${props.template.name} - ${props.template.id}`}</div>
                    {props.space && (
                        <div>{`${props.space.name} - ${props.space.id}`}</div>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        className={'add'}
                        onClick={handleAddSpace}
                        style={{ color: 'blue' }}
                    >
                        {'Add'}
                    </Button>
                    <Button className={'cancel'} onClick={handleClose}>
                        {'Cancel'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddSpaceDialog;
