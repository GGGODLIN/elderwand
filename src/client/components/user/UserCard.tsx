import clsx from 'clsx';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import EmailIcon from '@material-ui/icons/Email';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useEffect } from 'react';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { UserRoleIconMap } from 'src/client/configs/IconMap';
import { UserVM } from 'src/client/domain/user/UserVM';
import {
    Card,
    Typography,
    IconButton,
    Avatar,
    TextField,
    Grid,
} from '@material-ui/core';

export interface UserCardProps {
    classname?: string;
    user: UserVM;
}

type UserRoleType = 'admin' | 'tenant' | 'pe' | 'fe' | 'viewer';

export const UserCard: React.FC<UserCardProps> = (props) => {
    const classname = clsx(['user-card']);
    const { user } = props;

    const [desc_disable, setDescription] = React.useState(true);

    const handleDesOnClick = () => {
        console.log('click');
        setDescription(false);
    };

    useEffect(() => {
        const element = document.querySelector(
            `[id="${user.id}"] input[name=description]`
        );
        element.addEventListener('focusout', () => {
            setDescription(true);
        });
    }, []);

    return (
        <Card className={classname} id={user.id}>
            <Grid
                className={'card-header-actions'}
                container
                justify="space-between"
            >
                <Grid item>
                    <IconButton>
                        {/* <SupervisorAccountIcon /> */}
                        {UserRoleIconMap[user.role_id]}
                    </IconButton>
                </Grid>

                <Grid item>
                    <IconButton
                        style={{ visibility: 'visible' }}
                        onClick={() => {
                            console.log('click');
                        }}
                    >
                        <ControlCameraIcon />
                    </IconButton>
                </Grid>
            </Grid>

            <div className="card-header">
                <Grid className={'card-avatar'} container justify="center">
                    <Grid item>
                        <Avatar
                            alt="User Name"
                            src="/static/images/avatar-ninja.png"
                        />
                    </Grid>
                </Grid>

                <Grid
                    className={'card-info'}
                    container
                    justify="center"
                    direction="column"
                >
                    <Grid item>
                        <Typography variant="body1" align="left">
                            {user.display_name}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" align="left">
                            {user.username}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" align="left">
                            {user.email}
                        </Typography>
                    </Grid>
                </Grid>
            </div>

            <Grid className={'card-content'} container justify="center">
                <Grid item>
                    <TextField
                        name="description"
                        label="Description"
                        placeholder="description"
                        variant="outlined"
                        // multiline
                        // rows={1}
                        size="small"
                        onClick={handleDesOnClick}
                        disabled={desc_disable}
                    />
                </Grid>
            </Grid>

            <Grid className={'card-actions'} container justify="flex-end">
                <Grid item>
                    <IconButton
                        onClick={() => {
                            console.log('click');
                        }}
                    >
                        <EmailIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton
                        onClick={() => {
                            console.log('click');
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton
                        onClick={() => {
                            console.log('click');
                        }}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton
                        onClick={() => {
                            console.log('click');
                        }}
                    >
                        <DeleteForeverIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Card>
    );
};
