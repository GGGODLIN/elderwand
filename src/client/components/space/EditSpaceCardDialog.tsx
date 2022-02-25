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
import React, { ChangeEvent, useEffect } from 'react';
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
import DeviceMaintainAPIs from 'src/client/domain/device/DeviceMaintainAPIs';
import SpaceSlice from 'src/client/slices/SpaceSlice';

export const EditSpaceCardDialog = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const name = 'create-project-dialog';
    const form_id = 'edit-project-form';
    const TimeFormat = 'YYYY-MM-DD';


    const classname = clsx([name]);

    const onSubmit = (form) => {
        const url = `/api/spaces/${props?.data.id}`;
        // const params = {
        //     projectId: project.id,
        // };
        const data = {
            name: form?.name,
            parentId: props?.data.parentId,
            iconId: props?.data.iconId,
        };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .put(url, data)
            .then((res) => {
                console.log('spaces', res.data);
                const url = `/api/spaces`;
                const params = {
                    projectId: res?.data?.projectId,
                };

                new AxiosFactory()
                    .useBearerToken()
                    .useBefore(() => {
                        dispatch(FetchSlice.start());
                    })
                    .getInstance()
                    .get(url, { params: params })
                    .then((res) => {
                        dispatch(SpaceSlice.fetchSpaces(res.data));

                        console.log('SpaceSlice.fetchSpaces', res.data)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        dispatch(FetchSlice.end());
                    });
            })
            .catch((err) => {
                alert(err?.message);
            })
            .finally(() => {
                dispatch(FetchSlice.end());

                handleCloseDialog()
            });



    };

    const { register, handleSubmit, formState: { errors }, unregister } = useForm({
        mode: 'all',
    });

    const handleCreateProject = () => handleSubmit(onSubmit)();

    const handleErrorMessage = (error: any) => {
        if (error?.message) {
            return error.message;
        }
        return '';
    };

    const handleCloseDialog = () => {
        props?.setShow?.(false)
    };

    const handleChangeCloudCodeSelect = (
        e: ChangeEvent<{ name: string; value: string }>
    ) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(ProjectSlice.changeCreateProjectForm({ name, value }));
    };


    useEffect(() => {
        if (!props?.show) {
            unregister('name')
            unregister('expire_date')
        }
    }, [props?.show]);

    return (
        <Dialog
            aria-labelledby={name}
            className={classname}
            open={props?.show}
            onClose={handleCloseDialog}
            maxWidth="sm"
            fullWidth={false}
        >
            <DialogTitle>{'Modify Space'}</DialogTitle>
            <DialogContent>
                <form noValidate onSubmit={handleSubmit(onSubmit)} id={form_id}>
                    <Grid container direction="column">
                        <Grid item>
                            <TextField
                                label="Space Name"
                                name="name"
                                variant="outlined"
                                size="medium"
                                defaultValue={props?.data?.name}
                                autoFocus={true}
                                {...register('name', {
                                    required: `${t(
                                        kws.ErrorMessage.IsRequired
                                    )}`,
                                })}
                                error={!!errors.name}
                            />
                        </Grid>



                        {/* <Grid item>
                            <TextField
                                label="Expire Date"
                                name="expire_date"
                                type="date"
                                variant="outlined"
                                defaultValue={default_expire}
                                autoFocus={true}
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
                        </Grid> */}
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