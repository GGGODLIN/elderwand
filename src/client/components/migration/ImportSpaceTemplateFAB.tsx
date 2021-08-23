import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Zoom,
} from '@material-ui/core';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import DataMigrationAPIs from 'src/client/domain/migration/DataMigrationAPIs';
import { RootState } from 'src/client/reducer';
import DataMigrationSlice from 'src/client/slices/DataMigrationSlice';

interface ImportSpaceTemplateDialogProps {}

const ImportSpaceTemplateDialog = (props: ImportSpaceTemplateDialogProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const name = 'import-space-template-dialog';
    const classname = clsx([name]);

    const { space_template_dialog } = useSelector((state: RootState) => {
        return {
            space_template_dialog: state.migration.import_space_template_dialog,
        };
    });

    const handleCloseDialog = () => {
        dispatch(DataMigrationSlice.closeImportSpaceTemplateDialog());
    };

    const handleImportSpaceTemplates = () => {
        DataMigrationAPIs.importSpaceTemplates(dispatch, {}, () => {
            dispatch(DataMigrationSlice.closeImportSpaceTemplateDialog());
        });
    };

    const open = space_template_dialog.open;

    return (
        <Dialog
            aria-labelledby={name}
            className={classname}
            open={open}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth={false}
        >
            <DialogTitle>{'Import Space Templates'}</DialogTitle>
            <DialogContent>{'Import Space Template Info'}</DialogContent>
            <DialogActions>
                <Button
                    className={'import'}
                    onClick={handleImportSpaceTemplates}
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

interface ImportSpaceTemplateFABProps {
    display: boolean;
    disable: boolean;
}

const ImportSpaceTemplateFAB = (props: ImportSpaceTemplateFABProps) => {
    const dispatch = useDispatch();
    const name = 'import-space-template-btn';
    const display = props.display;
    const disable = props.disable;
    const classname = clsx(['fab', name, display ? '' : 'hidden']);

    const handleOpenDialog = () => {
        dispatch(DataMigrationSlice.importSpaceTemplate({}));
    };

    return (
        <React.Fragment>
            <Zoom in={display} timeout={1000}>
                <Fab
                    className={classname}
                    disabled={disable}
                    onClick={handleOpenDialog}
                >
                    <HomeWorkIcon />
                </Fab>
            </Zoom>
            <ImportSpaceTemplateDialog />
        </React.Fragment>
    );
};

export default ImportSpaceTemplateFAB;
