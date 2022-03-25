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

export const ConfirmDialog = (props) => {


    const { open, title, content, cancelText, confirmText, handleCancel, handleConfirm } = props;

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleCancel}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    {title ?? 'Confrim Dialog'}
                </DialogTitle>
                <DialogContent>
                    {content ?? ''}
                </DialogContent>
                <DialogActions>
                    <Button
                        className={'remove'}
                        onClick={handleConfirm}
                        style={{ color: 'red' }}
                    >
                        {confirmText ?? 'Confirm'}
                    </Button>
                    <Button className={'cancel'} onClick={handleCancel}>
                        {cancelText ?? 'Cancel'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ConfirmDialog;
