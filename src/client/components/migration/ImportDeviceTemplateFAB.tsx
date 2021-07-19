import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Zoom,
} from '@material-ui/core';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import clsx from 'clsx';
import React, { Dispatch } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import DataMigrationUtil from '../../domain/migration/DataMigrationUtil';
import { ProjectPreviewVM } from '../../domain/migration/MigraionPreviewVM';
import AxiosFactory from '../../helper/AxiosFactory';
import PaginationVM from '../../models/PaginationVM';
import { RootState } from '../../reducer';
import DataMigrationSlice from '../../slices/DataMigrationSlice';
import FetchSlice from '../../slices/FetchSlice';

interface ImportDeviceTemplateDialogProps {}

const importDeviceTemplates = (dispatch: Dispatch<any>): void => {
    const url = '/api/migration/device/templates';

    const params = DataMigrationUtil.getConnectionParams();

    const body = {};

    new AxiosFactory()
        .useBearerToken()
        .useBefore(() => {
            dispatch(FetchSlice.start());
        })
        .getInstance()
        .post<PaginationVM<any>>(url, body, { params: params })
        .then((res) => {
            console.log(res.data);
            dispatch(DataMigrationSlice.showImportDeviceTemplateDialog(false));
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            dispatch(FetchSlice.end());
        });
};

const ImportDeviceTemplateDialog = (props: ImportDeviceTemplateDialogProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const name = 'import-project-dialog';
    const classname = clsx([name]);

    const { show } = useSelector((state: RootState) => {
        const target: ProjectPreviewVM = state.migration.project_selected;
        return {
            project: target,
            show: state.migration.import_device_template_dialog.show,
        };
    });

    const handleCloseDialog = () => {
        dispatch(DataMigrationSlice.showImportDeviceTemplateDialog(false));
    };

    const handleImportDeviceTemplates = () => {
        importDeviceTemplates(dispatch);
    };

    return (
        <Dialog
            aria-labelledby={name}
            className={classname}
            open={show}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth={false}
        >
            <DialogTitle>{'Import Device Templates'}</DialogTitle>
            <DialogContent>{'Import Device Template Info'}</DialogContent>
            <DialogActions>
                <Button
                    className={'import'}
                    onClick={handleImportDeviceTemplates}
                >
                    {'import'}
                </Button>
                <Button className={'cancel'} onClick={handleCloseDialog}>
                    {'Close'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

interface ImportDeviceTemplateFABProps {
    display: boolean;
    disable: boolean;
}

const ImportDeviceTemplateFAB = (props: ImportDeviceTemplateFABProps) => {
    const dispatch = useDispatch();
    const name = 'import-device-template-btn';
    const display = props.display;
    const disable = props.disable;
    const classname = clsx(['fab', name, display ? '' : 'hidden']);

    const handleOpenDialog = () => {
        dispatch(DataMigrationSlice.showImportDeviceTemplateDialog(true));
    };

    return (
        <React.Fragment>
            <Zoom in={display} timeout={1000}>
                <Fab
                    className={classname}
                    disabled={disable}
                    onClick={handleOpenDialog}
                >
                    <LibraryBooksIcon />
                </Fab>
            </Zoom>
            <ImportDeviceTemplateDialog />
        </React.Fragment>
    );
};

export default ImportDeviceTemplateFAB;
