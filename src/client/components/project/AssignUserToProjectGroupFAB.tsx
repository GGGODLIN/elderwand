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
import React, { useEffect, Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/client/reducer';
import AllocateUserSlice from 'src/client/slices/AllocateUserSlice';
import AvailableUserSlice from 'src/client/slices/AvailableUserSlice';
import ProjectSlice from 'src/client/slices/ProjectSlice';
import { AllocateUserList } from './AllocateUserList';
import { AvailableUserList } from './AvailableUserList';
import AxiosFactory from 'src/client/helper/AxiosFactory';
import FetchSlice from 'src/client/slices/FetchSlice';

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

    const handleAssignUser = async () => {
        //const url = `/api/projects/${}/users`;
        const body = {
            users: users,
        };
        //console.log('handleAssignUser', body)
        dispatch(FetchSlice.start());
        const assignPromises = projects.map((pid) => {
            const url = `/api/projects/${pid}/users`
            return new AxiosFactory()
                .useBearerToken()
                .getInstance()
                .put<any>(url, body)
                .then((res) => {
                    //console.log('fetchUsers', res)
                    //dispatch(AvailableUserSlice.fetch(res.data));
                    return res
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    dispatch(FetchSlice.end());
                });
        })

        Promise.all(assignPromises).then(values => {
            dispatch(ProjectSlice.showAssignUserDialog(false));
            dispatch(ProjectSlice.refresh());
            dispatch(AllocateUserSlice.clear());
            dispatch(AvailableUserSlice.clear());
        }).catch(reason => {
            console.log(reason)
        }).finally(() => {
            dispatch(FetchSlice.end());
        })

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

        const url = `/api/users`;
        const params = {};

        new AxiosFactory()
            .useBearerToken()
            .useBefore(() => {
                dispatch(FetchSlice.start());
            })
            .getInstance()
            .get<any>(url, { params: params })
            .then((res) => {
                dispatch(AvailableUserSlice.fetch(res.data));
                if (projects?.length === 1) {
                    console.log('projects', projects)
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                dispatch(FetchSlice.end());
            });
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
                    {'OK'}
                </Button>
                <Button className={'cancel'} onClick={handleCloseDialog}>
                    {'Close'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};


// const fetchUsers = (dispatch: Dispatch<any>) => {
//     const url = `/api/users`;
//     const params = {};

//     new AxiosFactory()
//         .useBearerToken()
//         .useBefore(() => {
//             dispatch(FetchSlice.start());
//         })
//         .getInstance()
//         .get<any>(url, { params: params })
//         .then((res) => {
//             //console.log('fetchUsers', res)
//             dispatch(AvailableUserSlice.fetch(res.data));
//         })
//         .catch((err) => {
//             console.log(err);
//         })
//         .finally(() => {
//             dispatch(FetchSlice.end());
//         });
// };

