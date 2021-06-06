import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Grid,
    TextField,
    Zoom,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import clsx from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import DataMigrationUtil from 'src/client/domain/migration/DataMigrationUtil';
import { ProjectPreviewVM } from 'src/client/domain/migration/MigraionPreviewVM';
import AxiosFactory from 'src/client/helper/AxiosFactory';
import { RootState } from 'src/client/reducer';
import DataMigrationSlice from 'src/client/slices/DataMigrationSlice';
import FetchSlice from 'src/client/slices/FetchSlice';

interface ImportProjectForm {}

interface ImportProjectDialogProp {}

const ImportProjectDialog: React.FC<ImportProjectDialogProp> = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const name = 'import-project-dialog';
    const form_id = 'import-project-form';

    const classname = clsx([name]);

    const { project, show } = useSelector((state: RootState) => {
        const target: ProjectPreviewVM = state.migration.project_selected;
        return {
            project: target,
            show: state.migration.import_project_dialog.show,
        };
    });

    const { handleSubmit } = useForm<ImportProjectForm>({
        mode: 'onChange',
    });

    const onSubmit = (form: ImportProjectForm) => {
        // console.log('submit');

        const code = (
            document.querySelector(
                'input[name=project_code]'
            ) as HTMLInputElement
        )?.value;

        const params = DataMigrationUtil.getConnectionParams();

        const url = `/api/migration/projects/${project.projectCode}/devices`;

        const body = { code: code };

        new AxiosFactory()
            .getInstance()
            .post<any>(url, body, { params })
            .then((res) => {
                console.log(res.data);
                dispatch(DataMigrationSlice.showImportProjectDialog(false));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    const handleImportProject = () => handleSubmit(onSubmit)();

    const handleCloseDialog = () => {
        dispatch(DataMigrationSlice.showImportProjectDialog(false));
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
            <DialogTitle>{'Import Project'}</DialogTitle>
            <DialogContent>
                <form id={form_id} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <input hidden={true} />
                    <Grid container direction="column">
                        {/* <Grid item>{"TODO Select Exist Project"}</Grid> */}
                        {project && (
                            <Grid>
                                <Grid item>
                                    <TextField
                                        label="Name"
                                        name="name"
                                        variant="outlined"
                                        size="small"
                                        defaultValue={project.projectName}
                                        disabled={true}
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Display Name"
                                        name="display_name"
                                        variant="outlined"
                                        size="small"
                                        defaultValue={project.displayName}
                                        disabled={true}
                                        fullWidth={true}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Project Code"
                                        name="project_code"
                                        variant="outlined"
                                        size="small"
                                        defaultValue={project.projectCode}
                                        autoFocus={true}
                                        fullWidth={true}
                                        // inputRef={register({
                                        //   required: `${t(kws.ErrorMessage.IsRequired)}`,
                                        // })}
                                        // error={!!errors.name}
                                    />
                                </Grid>

                                {/* <Grid item>{project.cloudCode}</Grid> */}
                            </Grid>
                        )}
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button className={'import'} onClick={handleImportProject}>
                    {'import'}
                </Button>
                <Button className={'cancel'} onClick={handleCloseDialog}>
                    {'Close'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

interface ImportProjectFABProp {
    display: boolean;
    disable: boolean;
}

export const ImportProjectFAB: React.FC<ImportProjectFABProp> = (
    props = {
        display: true,
        disable: false,
    }
) => {
    const dispatch = useDispatch();
    const name = 'import-project-btn';
    const display = props.display;
    const disable = props.disable;
    const classname = clsx(['fab', name, display ? '' : 'hidden']);

    const handleOpenDialog = () => {
        dispatch(DataMigrationSlice.showImportProjectDialog(true));
    };

    return (
        <React.Fragment>
            <Zoom in={display} timeout={1000}>
                <Fab
                    className={classname}
                    disabled={disable}
                    onClick={handleOpenDialog}
                >
                    <CloudUploadIcon />
                </Fab>
            </Zoom>
            <ImportProjectDialog />
        </React.Fragment>
    );
};

export default ImportProjectFAB;
