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
    IconButton,
    InputLabel,
    Select,
    TextField,
    Zoom,
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import clsx from 'clsx';
import React, { ChangeEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { UserRoleEnum } from 'src/client/configs/Enum';
import kws from 'src/client/configs/Keywords';
import { RootState } from 'src/client/reducer';
import UserSlice from 'src/client/slices/UserSlice';
import AxiosFactory from 'src/client/helper/AxiosFactory';
import FetchSlice from 'src/client/slices/FetchSlice';

export const AddUserFAB: React.FC<any> = () => {
    const dispatch = useDispatch();
    const name = 'add-user-btn';

    const display = true;
    const classname = clsx(['fab', name, display ? '' : 'hidden']);

    const handleOpenDialog = () => {
        dispatch(UserSlice.showInviteDialog(true));
    };

    return (
        <React.Fragment>
            <Zoom in={display} timeout={1000}>
                <Fab className={classname} onClick={handleOpenDialog}>
                    <PersonAddIcon />
                </Fab>
            </Zoom>
            <InviteUserDialog />
        </React.Fragment>
    );
};

interface CreateUserForm {
    email: string;
    role_id: string;
    description: string;
}

export const InviteUserDialog: React.FC<{}> = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const name = 'invite-user-dialog';
    const form_id = 'invite-user-form';

    const { show, inviting_user, inviting_token } = useSelector(
        (state: RootState) => state.user.invite_dialog
    );
    const { user } = useSelector((state: RootState) => state.user);

    const classname = clsx(['fab', name, show ? '' : 'open']);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateUserForm>({
        mode: 'all',
    });

    // const origin = AxiosUtil.getOriginWithPort();
    //
    // const client = AxiosUtil.makeAxiosInstance(dispatch, origin);

    const onSubmit = (form: CreateUserForm) => {
        const body = {
            email: form?.email,
            roleID: parseInt(form.role_id),
            parentID: user?.id
        };

        const url = `/api/invitation/user`;

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .post<any>(url, body)
            .then((res) => {
                dispatch(UserSlice.setInvitingUserInfo(res.data));
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
    };

    const handleErrorMessage = (error: any) => {
        if (error?.message) {
            return error.message;
        }
        return '';
    };

    const handleChangeRoleSelect = (
        e: ChangeEvent<{ name: string; value: string }>
    ) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(UserSlice.changeInviteUserForm({ name, value }));
    };

    const handleCreateUser = () => handleSubmit(onSubmit)();

    const handleCopyInviteUrl = () => {
        const elem = document.querySelector('textarea[name=invite_url]') as any;
        elem.select();
        document.execCommand('copy');
    };

    const handleInviteUser = () => { };

    const handleClearDialog = () => {
        dispatch(UserSlice.clearInviteUserForm());
    };

    const handleCloseDialog = () => {
        dispatch(UserSlice.showInviteDialog(false));
        if (!!inviting_user) {
            dispatch(UserSlice.clearInviteUserForm());
            dispatch(UserSlice.refresh());
        }
    };

    // const options: {
    //     name: string;
    //     value: any;
    //     display?: boolean;
    //     disabled?: boolean;
    // }[] = [
    //         { name: 'Select...', value: '', display: false },
    //         { name: 'Tenant', value: UserRoleEnum.Tenant },
    //         { name: 'Project Engineer', value: UserRoleEnum.ProjectEngineer },
    //         { name: 'Filed Engineer', value: UserRoleEnum.FieldEngineer },
    //         { name: 'Viewer', value: UserRoleEnum.Viewer },
    //     ];

    const options: {
        name: string;
        value: any;
        display?: boolean;
        disabled?: boolean;
    }[] = userInvitationPolicy(user?.roleId);

    const items = options.map((item, idx) => {
        // if (!!item?.value && user?.roleId >= item?.value) {
        //     return null
        // }
        return (
            <option
                key={idx}
                value={`${item.value}`}
                disabled={item?.disabled}
                style={{ display: `${!item.display ? 'block' : 'none'}` }}
            >
                {item.name}
            </option>
        );
    });

    const role_select_id = 'role_select_input';

    const maxWidth = 'sm';

    const invite_url = !!inviting_token
        ? `${origin}/register?token=${inviting_token}`
        : '';

    useEffect(() => {
        dispatch(UserSlice.clearInviteUserForm());
    }, []);

    return (
        <Dialog
            aria-labelledby={name}
            className={classname}
            open={show}
            onClose={handleCloseDialog}
            maxWidth={maxWidth}
            fullWidth={true}
        >
            <DialogTitle>{t(kws.InviteUserDialog.InviteUser)}</DialogTitle>
            <DialogContent>
                <form noValidate onSubmit={handleSubmit(onSubmit)} id={form_id}>
                    <Grid container direction="column">
                        <Grid item>
                            <FormControl
                                className={'role-select'}
                                variant="outlined"
                                size="small"
                            >
                                <InputLabel htmlFor={role_select_id}>
                                    {'Role Type'}
                                </InputLabel>
                                <Select
                                    native
                                    inputProps={{
                                        // name: "role_id",
                                        id: role_select_id,
                                    }}
                                    // name="role"
                                    // id={role_select_id}
                                    // value={form.role_id}
                                    defaultValue={''}
                                    onChange={handleChangeRoleSelect}
                                    required
                                    // inputRef={register({
                                    //   required: `${t(kws.ErrorMessage.IsRequired)}`,
                                    // })}
                                    {...register('role_id', {
                                        required: `${t(
                                            kws.ErrorMessage.IsRequired
                                        )}`,
                                    })}
                                    error={!!errors.role_id}
                                    disabled={!!inviting_user}
                                    autoFocus={true}
                                >
                                    {items}
                                </Select>
                                <FormHelperText>
                                    {handleErrorMessage(errors.role_id)}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        {!!inviting_user && (
                            <React.Fragment>
                                <Grid item>
                                    <TextField
                                        name="username"
                                        label="Username"
                                        variant="outlined"
                                        style={{ width: '100%' }}
                                        size="small"
                                        value={inviting_user.username}
                                        disabled={true}
                                    />
                                </Grid>
                            </React.Fragment>
                        )}

                        <Grid item>
                            <TextField
                                // name="description"
                                label="Description"
                                multiline
                                variant="outlined"
                                placeholder="Description"
                                style={{ width: '100%' }}
                                rows={1}
                                size="small"
                                // inputRef={register({
                                //   maxLength: {
                                //     value: 128,
                                //     message: `${t(kws.ErrorMessage.MaxLength)}`,
                                //   },
                                // })}
                                {...register('description', {
                                    maxLength: {
                                        value: 128,
                                        message: `${t(
                                            kws.ErrorMessage.MaxLength
                                        )}`,
                                    },
                                })}
                            // TODO value
                            />
                        </Grid>

                        <Grid item>
                            <TextField
                                // name="email"
                                type="text"
                                variant="outlined"
                                placeholder="Email"
                                label={t(kws.LoginPage.EmailAddress)}
                                style={{ width: '100%' }}
                                fullWidth
                                autoComplete="email"
                                // inputRef={register({
                                //   pattern: {
                                //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                //     message: `${t(kws.ErrorMessage.InvalidEmailAddress)}`,
                                //   },
                                // })}
                                {...register(`email`, {
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: `${t(
                                            kws.ErrorMessage.InvalidEmailAddress
                                        )}`,
                                    },
                                })}
                                error={!!errors.email}
                                helperText={handleErrorMessage(errors.email)}
                                size="small"
                            />
                        </Grid>

                        {!!inviting_token && (
                            <React.Fragment>
                                <Grid item>
                                    <TextField
                                        className="invite-url"
                                        name="invite_url"
                                        label="Invite URL"
                                        variant="outlined"
                                        style={{ width: '100%' }}
                                        size="small"
                                        value={invite_url}
                                        multiline
                                        rows={6}
                                        onClick={handleCopyInviteUrl}
                                    />
                                    <div className="copy-btn">
                                        <IconButton
                                            onClick={handleCopyInviteUrl}
                                        >
                                            <FileCopyIcon />
                                        </IconButton>
                                    </div>
                                </Grid>
                            </React.Fragment>
                        )}
                    </Grid>
                </form>
            </DialogContent>

            <DialogActions>
                {!inviting_user && (
                    <Button className={'clear'} onClick={handleClearDialog}>
                        {'Clear'}
                    </Button>
                )}

                {!inviting_user && (
                    <Button className={'create'} onClick={handleCreateUser}>
                        {'Generate'}
                    </Button>
                )}

                {/* {!!inviting_user && (
                    <Button className={'edit'} onClick={handleCreateUser}>
                        {'Save'}
                    </Button>
                )} */}

                {/* {!!inviting_user && !!inviting_user.email && (
                    <Button className={'invite'} onClick={handleInviteUser}>
                        {'Invite'}
                    </Button>
                )} */}

                <Button className={'cancel'} onClick={handleCloseDialog}>
                    {'Close'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const userInvitationPolicy = (userRoleId) => {

    if (userRoleId === 2) {
        return [
            { name: 'Select...', value: '', display: false },
            { name: 'Tenant', value: UserRoleEnum.Tenant },
        ]
    } else if (userRoleId === 5) {
        return [
            { name: 'Select...', value: '', display: false },
            { name: 'Project Engineer', value: UserRoleEnum.ProjectEngineer },
            { name: 'Filed Engineer', value: UserRoleEnum.FieldEngineer },
            { name: 'Viewer', value: UserRoleEnum.Viewer },
        ]
    } else if (userRoleId === 6) {
        return [
            { name: 'Select...', value: '', display: false },
            { name: 'Filed Engineer', value: UserRoleEnum.FieldEngineer },
        ]
    } else {
        return [
            { name: 'Select...', value: '', display: false },
        ]
    }
}
