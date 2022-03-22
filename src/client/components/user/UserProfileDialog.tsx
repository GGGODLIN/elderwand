import {
    Avatar,
    Button,
    Card,
    CardContent,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { AxiosError, AxiosResponse } from 'axios';
import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ClientEnvVar } from 'src/client/configs/ClientEnvVar';
import kws from 'src/client/configs/Keywords';
import AxiosFactory from 'src/client/helper/AxiosFactory';
import FetchSlice from 'src/client/slices/FetchSlice';
import { RootState } from 'src/client/reducer';
import UserSlice from '../../slices/UserSlice';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

interface LoginForm {
    email: string;
    username: string;
    password: string;
    displayName: string;
    remember: boolean;
    tel: string;
    address: string;
    confirmPassword: string;
}

const handleErrorMessage = (error: any) => {
    if (error?.message) {
        return error.message;
    }
    return '';
};

const handleSubmitLock = (errors: any): boolean => {
    return Object.keys(errors).length > 0;
};

export interface LoginPageProps {
    title: string;
}

export const UserProfileDialog = (props) => {
    const name = 'login';
    const classname = `${name}`;
    const { open, handleCancel, handleConfirm, user } = props;
    const dispatch = useDispatch();
    const { t } = useTranslation();
    console.log('user', user)
    const { isLoading } = useSelector((state: RootState) => state.fetch);


    let defaultValues = {
        username: user?.account?.username,
        displayName: user?.displayName,
        email: user?.email,
        tel: user?.tel,
        address: user?.address
    };

    const {
        register,
        watch,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LoginForm>({
        mode: 'all',
        defaultValues: defaultValues,
    });

    const onSubmit = async (form: LoginForm) => {
        const url = `/api/users/${user?.id}`;
        const body = { ...form };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .put<any>(url, body)
            .then((res) => {
                dispatch(UserSlice.initial(res.data));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    const handleEditUserPwd = async (password) => {
        const url = `/api/password`;
        const body = {
            password: password,
            userId: user?.id
        };

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .put<any>(url, body)
            .then((res) => {
                //dispatch(UserSlice.initial(res.data));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
                setIsEditPwd(false)
            });
    };

    useEffect(() => {
        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .get('/api/user/me')
            .then((res) => {
                if (res.status == 200) {
                    dispatch(UserSlice.initial(res.data));
                    return;
                }
            })
            .catch((err: AxiosError) => {
                console.log(err.response.status);
                console.log(err.message);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    }, []);

    return (
        <React.Fragment>
            <div>
                <Dialog
                    open={open}
                    onClose={handleCancel}
                    aria-labelledby="form-dialog-title"
                >
                    {/* <DialogTitle id="form-dialog-title">
                        {'Confrim Dialog'}
                    </DialogTitle> */}
                    <DialogContent>
                        {isLoading || < div className={classname}>
                            <Container className={'login-form-container'} maxWidth={'xs'}>
                                <Card className={'login-form-card'}>
                                    <CardContent>
                                        <Typography className="title">
                                            {`${user?.displayName} [${user?.role?.name}]`}
                                        </Typography>
                                        <Avatar className="avatar">
                                            <LockOutlinedIcon />
                                        </Avatar>
                                        <form noValidate onSubmit={handleSubmit(onSubmit)}>
                                            <TextField
                                                type="text"
                                                label={t(kws.UserProfile.Account)}
                                                variant="standard"
                                                disabled
                                                margin="normal"
                                                fullWidth
                                                autoFocus
                                                size="medium"
                                                defaultValue={defaultValues?.username}
                                                {...register('username', { value: defaultValues?.username })}
                                                onChange={(
                                                    e: ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    setValue('username', e.target.value);
                                                }}
                                                error={!!errors.username}
                                                helperText={handleErrorMessage(
                                                    errors.username
                                                )}
                                            />

                                            <TextField
                                                type="text"
                                                label={t(kws.UserProfile.FullName)}
                                                variant="standard"
                                                disabled
                                                margin="normal"
                                                fullWidth
                                                size="medium"
                                                defaultValue={defaultValues?.displayName}
                                                {...register('displayName', {
                                                    value: defaultValues?.displayName,
                                                    required: `${t(
                                                        kws.ErrorMessage.IsRequired
                                                    )}`,
                                                })}
                                                onChange={(
                                                    e: ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    setValue('displayName', e.target.value);
                                                }}
                                                error={!!errors.displayName}
                                                helperText={handleErrorMessage(
                                                    errors.displayName
                                                )}
                                            />

                                            <TextField
                                                type="text"
                                                label={t(kws.UserProfile.Email)}
                                                variant="standard"
                                                disabled
                                                margin="normal"
                                                fullWidth
                                                size="medium"
                                                defaultValue={defaultValues?.email}
                                                {...register('email', {
                                                    value: defaultValues?.email,
                                                    required: `${t(
                                                        kws.ErrorMessage.IsRequired
                                                    )}`,
                                                })}
                                                onChange={(
                                                    e: ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    setValue('email', e.target.value);
                                                }}
                                                error={!!errors.email}
                                                helperText={handleErrorMessage(
                                                    errors.email
                                                )}
                                            />

                                            <TextField
                                                type="text"
                                                label={t(kws.UserProfile.Phone)}
                                                variant="standard"
                                                disabled
                                                margin="normal"
                                                fullWidth
                                                size="medium"
                                                defaultValue={defaultValues?.tel}
                                                {...register('tel', {
                                                    value: defaultValues?.tel,
                                                    required: `${t(
                                                        kws.ErrorMessage.IsRequired
                                                    )}`,
                                                })}
                                                onChange={(
                                                    e: ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    setValue('tel', e.target.value);
                                                }}
                                                error={!!errors.tel}
                                                helperText={handleErrorMessage(
                                                    errors.tel
                                                )}
                                            />

                                            <TextField
                                                type="text"
                                                label={t(kws.UserProfile.Address)}
                                                variant="standard"
                                                disabled
                                                margin="normal"
                                                fullWidth
                                                size="medium"
                                                defaultValue={defaultValues?.address}
                                                {...register('address', {
                                                    value: defaultValues?.address,
                                                    required: `${t(
                                                        kws.ErrorMessage.IsRequired
                                                    )}`,
                                                })}
                                                onChange={(
                                                    e: ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    setValue('address', e.target.value);
                                                }}
                                                error={!!errors.address}
                                                helperText={handleErrorMessage(
                                                    errors.address
                                                )}
                                            />


                                        </form>
                                    </CardContent>
                                </Card>
                            </Container>
                        </div>}
                    </DialogContent>
                    <DialogActions>
                        {/* <Button
                            className={'remove'}
                            onClick={handleConfirm}
                            style={{ color: 'red' }}
                        >
                            {'Confirm'}
                        </Button> */}
                        <Button className={'cancel'} onClick={handleCancel}>
                            {'Ok'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        </React.Fragment >
    );
};

