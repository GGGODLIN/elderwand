import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';
import { useDispatch } from 'react-redux';
import DeviceMaintainAPIs from 'src/client/domain/device/DeviceMaintainAPIs';
import { ProjectVM, SpaceVM } from 'src/client/domain/device/DeviceVM';
import SpaceSlice from 'src/client/slices/SpaceSlice';

interface RemoveSpaceDialogProps {
    open: boolean;
    project: ProjectVM;
    space: SpaceVM;
}

const RemoveSpaceDialog: React.FC<RemoveSpaceDialogProps> = (props) => {
    const dispatch = useDispatch();

    if (!props.open) {
        return null;
    }

    const handleClose = () => {
        dispatch(SpaceSlice.closeRemoveSpaceDialog());
    };

    const handleRemoveSpace = () => {
        if (!props.space) {
            return;
        }

        DeviceMaintainAPIs.removeSpace(
            dispatch,
            props.project,
            props.space,
            () => {
                dispatch(SpaceSlice.closeRemoveSpaceDialog());
                dispatch(SpaceSlice.refreshSpace());
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
                    {'Remove Space'}
                </DialogTitle>
                <DialogContent>
                    <div>{`${props.project.name} - ${props.project.code}`}</div>
                    {props.space && (
                        <div>{`${props.space.name} - ${props.space.id}`}</div>
                    )}
                </DialogContent>
                <DialogActions>
                    {props.space && (
                        <Button
                            className={'add'}
                            onClick={handleRemoveSpace}
                            style={{ color: 'red' }}
                        >
                            {'Remove'}
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

export default RemoveSpaceDialog;
