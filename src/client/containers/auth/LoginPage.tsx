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
import { ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ClientEnvVar } from 'src/client/configs/ClientEnvVar';
import kws from 'src/client/configs/Keywords';
import AxiosFactory from 'src/client/helper/AxiosFactory';
import FetchSlice from 'src/client/slices/FetchSlice';

interface LoginForm {
    email: string;
    username: string;
    password: string;
    remember: boolean;
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

const LoginPage: React.FC<LoginPageProps> = (props) => {
    const name = 'login';
    const classname = `${name} page`;

    const dispatch = useDispatch();
    const { t } = useTranslation();

    let defaultValues = {
        username: '',
        password: '',
    };

    if (ClientEnvVar.IsDev) {
        defaultValues.username = 'skymap_admin';
        defaultValues.password = 'password';
    }

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LoginForm>({
        mode: 'all',
        defaultValues: defaultValues,
    });

    const onSubmit = async (form: LoginForm) => {
        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .post('/api/login', form)
            .then((res: AxiosResponse<{ id: string; username: string }>) => {
                console.log(res.data);
                if (200 <= res.status && res.status < 300) {
                    window.location.replace('/admin');
                    return;
                }
            })
            .catch((err: AxiosError<any>) => {
                if (err.isAxiosError) {
                    console.error(err.message);
                    return;
                }
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    return (
        <React.Fragment>
            <div className={classname}>
                <Container className={'login-form-container'} maxWidth={'xs'}>
                    <Card className={'login-form-card'}>
                        <CardContent>
                            <Avatar className="avatar">
                                <LockOutlinedIcon />
                            </Avatar>

                            <Typography className="title">
                                {t(kws.LoginPage.Login)}
                            </Typography>

                            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                                <TextField
                                    type="text"
                                    label={t(kws.LoginPage.Username)}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    size="medium"
                                    autoComplete="username"
                                    defaultValue={defaultValues.username}
                                    {...register('username', {
                                        required: `${t(
                                            kws.ErrorMessage.IsRequired
                                        )}`,
                                    })}
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
                                    type="password"
                                    label={t(kws.LoginPage.Password)}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    size="medium"
                                    defaultValue={defaultValues.password}
                                    {...register('password', {
                                        required: `${t(
                                            kws.ErrorMessage.IsRequired
                                        )}`,
                                    })}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ) => {
                                        setValue('password', e.target.value);
                                    }}
                                    error={!!errors.password}
                                    helperText={handleErrorMessage(
                                        errors.password
                                    )}
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="remember"
                                            color="primary"
                                            onChange={(
                                                e: ChangeEvent<HTMLInputElement>
                                            ) => {
                                                setValue(
                                                    'remember',
                                                    e.target.checked
                                                );
                                            }}
                                        />
                                    }
                                    label={t(kws.LoginPage.RememberMe)}
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={handleSubmitLock(errors)}
                                >
                                    {t(kws.LoginPage.Login)}
                                </Button>

                                <Grid container className={'other-action'}>
                                    <Grid item xs>
                                        <Link
                                            href={'/register'}
                                            variant="body2"
                                        >
                                            {t(
                                                kws.LoginPage.DoNotHaveAnAccount
                                            )}
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link
                                            href={'/password/reset'}
                                            variant="body2"
                                        >
                                            {t(kws.LoginPage.ForgotPassword) +
                                                ' ?'}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default LoginPage;
