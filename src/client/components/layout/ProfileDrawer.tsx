import {
    Avatar,
    Divider,
    Drawer,
    FormControlLabel,
    Switch,
    Typography,
    withStyles,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import clsx from 'clsx';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/client/reducer';
import LayoutSlice from 'src/client/slices/LayoutSlice';

const LogoutButton: React.FC<{}> = (props) => {
    return (
        <a href="/logout">
            <ExitToAppIcon />
            <Typography variant="button">{'Logout'}</Typography>
        </a>
    );
};

const SettingSwitch = withStyles({
    switchBase: {
        color: blue[500],
        '&$checked': {
            color: blue[700],
        },
        '&$checked + $track': {
            backgroundColor: blue[700],
        },
    },
    checked: {},
    track: {},
})(Switch);

const SwitchFormControlLabel: React.FC<{
    onChange: (
        event: React.ChangeEvent<HTMLInputElement>,
        checked: boolean
    ) => void;
    label: string;
    value: string;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
}> = (props) => {
    return (
        <FormControlLabel
            labelPlacement="start"
            control={
                <SettingSwitch
                    size="medium"
                    color="primary"
                    onChange={props.onChange}
                />
            }
            label={<Typography variant="button">{props.label}</Typography>}
            value={props.children}
            defaultChecked={props.defaultChecked}
            disabled={props.disabled}
            checked={props.checked}
        />
    );
};

export const ProfileDrawer: React.FC<{}> = () => {
    const dispatch = useDispatch();

    const handleDrawerClose = () => {
        dispatch(LayoutSlice.openProfileDrawer(false));
    };

    const { display, open } = useSelector(
        (state: RootState) => state.layout.profile_drawer
    );

    const { user } = useSelector((state: RootState) => state.user);

    if (!user) {
        return <React.Fragment />;
    }

    const classname = clsx('profile-drawer', open ? 'open' : '');
    const mask = clsx('mask', open ? 'open' : '');

    if (!display) {
        return <React.Fragment />;
    }

    return (
        <React.Fragment>
            <Drawer
                id={'profile-drawer'}
                className={classname}
                variant="permanent"
                anchor={'right'}
            >
                <div className="drawer-header">
                    <div className="close-drawer">
                        <a onClick={handleDrawerClose}>
                            <CloseIcon />
                        </a>
                    </div>
                </div>
                <div className={'avatar'}>
                    <Avatar
                        alt="User Name"
                        src="/static/images/avatar-ninja.png"
                    />
                </div>
                <div className="user-info">
                    <ul>
                        <li>
                            <Typography variant="subtitle1">
                                {user.display_name}
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="subtitle1">
                                {user.username}
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="button">
                                {user.role_code}
                            </Typography>
                        </li>
                    </ul>
                </div>
                <Divider />
                <div className="settings">
                    <ul>
                        <li>
                            <SwitchFormControlLabel
                                onChange={() => {}}
                                label="SETTING 1"
                                value={'setting_1'}
                                checked={true}
                            />
                        </li>
                        <li>
                            <SwitchFormControlLabel
                                onChange={() => {}}
                                label="SETTING 2"
                                value={'setting_2'}
                                checked={false}
                            />
                        </li>
                        <li>
                            <SwitchFormControlLabel
                                onChange={() => {}}
                                label="SETTING 3"
                                value={'setting_3'}
                                checked={true}
                                disabled={true}
                            />
                        </li>
                    </ul>
                </div>
                <Divider />
                <div className="actions">
                    <ul>
                        <li>
                            <LogoutButton />
                        </li>
                    </ul>
                </div>
            </Drawer>

            <div className={mask} onClick={handleDrawerClose} />
        </React.Fragment>
    );
};
