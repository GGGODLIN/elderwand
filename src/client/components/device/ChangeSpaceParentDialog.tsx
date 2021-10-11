import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { useDispatch } from 'react-redux';
import DeviceMaintainAPIs from 'src/client/domain/device/DeviceMaintainAPIs';
import { ProjectVM, SpaceVM } from 'src/client/domain/device/DeviceVM';
import DeviceSlice from 'src/client/slices/DeviceSlice';

interface ChangeSpaceParentDialogProps {
    open: boolean;
    project: ProjectVM;
    space: SpaceVM;
    parent: SpaceVM;
}

const ChangeSpaceParentDialog: React.FC<ChangeSpaceParentDialogProps> = (
    props
) => {
    const dispatch = useDispatch();

    if (!props.open) {
        return null;
    }

    const handleClose = () => {
        dispatch(DeviceSlice.closeChangeSpaceParentDialog());
    };

    const handleChangeParent = () => {
        if (!props.space || !props.parent) {
            return;
        }

        const space: SpaceVM = {
            ...props.space,
            parentId: !props.parent ? null : props.parent.id,
        };

        DeviceMaintainAPIs.editSpace(dispatch, props.project, space, () => {
            DeviceMaintainAPIs.fetchDeviceTopologyResources(
                dispatch,
                props.project,
                () => {
                    dispatch(DeviceSlice.closeChangeSpaceParentDialog());
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
                    {'Change Space Parent'}
                </DialogTitle>
                <DialogContent>
                    <div>{`${props.project.name} - ${props.project.code}`}</div>
                    {props.space && (
                        <div>{`${props.space.name} - ${props.space.id}`}</div>
                    )}
                    {props.parent && (
                        <div>{`${props.parent.name} - ${props.parent.id}`}</div>
                    )}
                </DialogContent>
                <DialogActions>
                    {props.space && props.parent && (
                        <Button
                            className={'change'}
                            onClick={handleChangeParent}
                            style={{ color: 'orange' }}
                        >
                            {'Change'}
                        </Button>
                    )}
                    <Button className={'cancel'} onClick={handleClose}>
                        {'Cancel'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ChangeSpaceParentDialog;
