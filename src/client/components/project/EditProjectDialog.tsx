import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    Select,
    TextField,
    Zoom,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { AxiosError, AxiosResponse } from 'axios';
import clsx from 'clsx';
import React, { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ClientEnvVar } from 'src/client/configs/ClientEnvVar';
import { CloudCodeEnum } from 'src/client/configs/Enum';
import kws from 'src/client/configs/Keywords';
import { RootState } from 'src/client/reducer';
import FetchSlice from 'src/client/slices/FetchSlice';
import ProjectSlice from 'src/client/slices/ProjectSlice';
import TimeUtil from 'src/client/utils/TimeUtil';
import AxiosFactory from 'src/client/helper/AxiosFactory';

export const EditProjectDialog: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const name = 'create-project-dialog';
    const form_id = 'edit-project-form';
    const TimeFormat = 'YYYY-MM-DD';

    const { show, project } = useSelector(
        (state: RootState) => state.project.edit_dialog
    );


    const classname = clsx([name]);

    const onSubmit = (form) => {


        const body = {
            name: form.name,
            cloudCodeId: project?.cloudCodeId,
            expireDate: new Date(form.expire_date).toISOString().slice(0, new Date(form.expire_date).toISOString().length - 1),
        };

        const url = `/api/projects/${project?.id}`;

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .put<any>(url, body)
            .then((res) => {
                dispatch(ProjectSlice.showEditDialog(false));
                dispatch(ProjectSlice.refresh());
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });

    };

    const { register, handleSubmit, formState: { errors }, } = useForm<CreateProjectForm>({
        mode: 'onChange',
    });

    const handleCreateProject = () => handleSubmit(onSubmit)();

    const handleErrorMessage = (error: any) => {
        if (error?.message) {
            return error.message;
        }
        return '';
    };

    const handleCloseDialog = () => {
        dispatch(ProjectSlice.showEditDialog(false));
    };

    const handleChangeCloudCodeSelect = (
        e: ChangeEvent<{ name: string; value: string }>
    ) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(ProjectSlice.changeCreateProjectForm({ name, value }));
    };

    let default_name = project?.name ?? '';
    let default_expire = TimeUtil.new(project?.expireDate ?? new Date()).format('YYYY-MM-DD');

    return (
        <Dialog
            aria-labelledby={name}
            className={classname}
            open={show}
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth={false}
        >
            <DialogTitle>{'Modify Project'}</DialogTitle>
            <DialogContent>
                <form noValidate onSubmit={handleSubmit(onSubmit)} id={form_id}>
                    <Grid container direction="column">
                        <Grid item>
                            <TextField
                                label="Project Name"
                                name="name"
                                variant="outlined"
                                size="medium"
                                defaultValue={default_name}
                                autoFocus={true}
                                {...register('name', {
                                    required: `${t(
                                        kws.ErrorMessage.IsRequired
                                    )}`,
                                })}
                                error={!!errors.name}
                            />
                        </Grid>



                        <Grid item>
                            <TextField
                                label="Expire Date"
                                name="expire_date"
                                type="date"
                                variant="outlined"
                                defaultValue={default_expire}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                {...register('expire_date', {
                                    required: `${t(
                                        kws.ErrorMessage.IsRequired
                                    )}`,
                                })}
                                error={!!errors.expire_date}
                            />
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button className={'create'} onClick={handleCreateProject}>
                    {'Confirm'}
                </Button>
                <Button className={'cancel'} onClick={handleCloseDialog}>
                    {'Close'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};