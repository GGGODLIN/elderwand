import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    IconButton,
    Zoom,
} from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import GroupAddTwoToneIcon from '@material-ui/icons/GroupAddTwoTone';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/client/reducer';
import AllocateUserSlice from 'src/client/slices/AllocateUserSlice';
import AvailableUserSlice from 'src/client/slices/AvailableUserSlice';
import ProjectSlice from 'src/client/slices/ProjectSlice';
import { AllocateUserList } from './AllocateUserList';
import { AvailableUserList } from './AvailableUserList';

interface AssignUserToProjectGroupFABProp {
    disable: boolean;
}

export const AssignUserToProjectGroupFAB: React.FC<AssignUserToProjectGroupFABProp> =
    (
        props = {
            disable: false,
        }
    ) => {
        const dispatch = useDispatch();

        const display = true;
        const name = 'assign-user-btn';
        const classname = clsx(['fab', name, display ? '' : 'hidden']);

        const handleOpenDialog = () => {
            dispatch(ProjectSlice.showAssignUserDialog(true));
        };

        return (
            <React.Fragment>
                <Zoom in={display} timeout={1000}>
                    <Fab
                        className={classname}
                        onClick={handleOpenDialog}
                        disabled={props.disable}
                    >
                        <GroupAddTwoToneIcon />
                    </Fab>
                </Zoom>
                <AssignUserToProjectDialog />
            </React.Fragment>
        );
    };

const MoveUserAction: React.FC<{}> = () => {
    const dispatch = useDispatch();

    const { available_users, available_users_selected } = useSelector(
        (state: RootState) => {
            return {
                available_users: state.available_users.users,
                available_users_selected: state.available_users.selected,
            };
        }
    );

    const { allocate_users, allocate_users_selected } = useSelector(
        (state: RootState) => {
            return {
                allocate_users: state.allocate_users.users,
                allocate_users_selected: state.allocate_users.selected,
            };
        }
    );

    const handleAllocate = () => {
        const users = available_users.filter(
            (item) => available_users_selected.indexOf(item.id) >= 0
        );
        dispatch(AllocateUserSlice.push(users));
        dispatch(AvailableUserSlice.remove(available_users_selected));
    };
    const handleRemove = () => {
        const users = allocate_users.filter(
            (item) => allocate_users_selected.indexOf(item.id) >= 0
        );
        dispatch(AvailableUserSlice.push(users));
        dispatch(AllocateUserSlice.remove(allocate_users_selected));
    };

    return (
        <div className="actions">
            <IconButton aria-label="add" onClick={handleAllocate}>
                <ChevronRightIcon />
            </IconButton>
            <IconButton aria-label="remove" onClick={handleRemove}>
                <ChevronLeftIcon />
            </IconButton>
        </div>
    );
};

export const AssignUserToProjectDialog: React.FC<{}> = () => {
    const dispatch = useDispatch();

    const name = 'assign-user-to-project-dialog';

    const { show, projects, users } = useSelector((state: RootState) => {
        return {
            show: state.project.assign_user_dialog.show,
            projects: state.project.selected,
            users: state.allocate_users.users.map((user) => user.id),
        };
    });

    const classname = clsx([name]);

    const handleCloseDialog = () => {
        dispatch(ProjectSlice.showAssignUserDialog(false));
    };

    // const origin = AxiosUtil.getOriginWithPort();
    // const client = AxiosUtil.makeAxiosInstance(dispatch, origin);

    const handleAssignUser = () => {
        const url = '/api/project/group/user';
        const body = {
            projects: projects,
            users: users,
        };

        // // TODO rewrite
        // client
        //     .post(url, body)
        //     .then((res) => {
        //         // console.log(res.data);
        //         dispatch(ProjectSlice.showAssignUserDialog(false));
        //         dispatch(ProjectSlice.refresh());
        //         dispatch(AllocateUserSlice.clear());
        //         dispatch(AvailableUserSlice.clear());
        //     })
        //     .catch((err: AxiosError) => {
        //         AxiosUtil.redirectUnAuthorization(err);
        //     })
        //     .finally(() => {
        //         dispatch(FetchSlice.end());
        //     });
    };

    useEffect(() => {
        if (!show) {
            return;
        }

        // TODO fetch with current user
        const params = {
            limit: 100,
            offset: 0,
        };
        // TODO rewrite
        // client
        //     .get<PaginationVM<UserVM>>('/api/users', { params: params })
        //     .then((res) => {
        //         dispatch(AvailableUserSlice.fetch(res.data));
        //     })
        //     .catch((err: AxiosError) => {
        //         AxiosUtil.redirectUnAuthorization(err);
        //     })
        //     .finally(() => {
        //         dispatch(FetchSlice.end());
        //     });
    }, [show]);

    const { available_users, available_users_selected } = useSelector(
        (state: RootState) => {
            return {
                available_users: state.available_users.users,
                available_users_selected: state.available_users.selected,
            };
        }
    );

    const { allocate_users, allocate_users_selected } = useSelector(
        (state: RootState) => {
            return {
                allocate_users: state.allocate_users.users,
                allocate_users_selected: state.allocate_users.selected,
            };
        }
    );

    return (
        <Dialog
            aria-labelledby={name}
            className={classname}
            open={show}
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth={true}
        >
            <DialogTitle>{'Assign User'}</DialogTitle>
            <DialogContent>
                <AvailableUserList
                    users={available_users}
                    selected={available_users_selected}
                />
                <MoveUserAction />
                <AllocateUserList
                    users={allocate_users}
                    selected={allocate_users_selected}
                />
            </DialogContent>
            <DialogActions>
                <Button className={'assign'} onClick={handleAssignUser}>
                    {'Assign'}
                </Button>
                <Button className={'cancel'} onClick={handleCloseDialog}>
                    {'Close'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
