import { AppBar } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/client/reducer';
import LayoutSlice from 'src/client/slices/LayoutSlice';
import { FeatureDrawer } from './FeatureDrawer';
import { ProfileDrawer } from './ProfileDrawer';

const LoginButton: React.FC<{}> = (props) => {
    return (
        <a href="/login">
            <InputIcon />
        </a>
    );
};

const ProfileButton: React.FC<{}> = (props) => {
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        dispatch(LayoutSlice.openProfileDrawer(true));
    };

    return (
        <a onClick={handleDrawerOpen}>
            <AccountCircleIcon />
        </a>
    );
};

const FeatureButton: React.FC<{}> = (props) => {
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        dispatch(LayoutSlice.openFeatureDrawer(true));
    };

    return (
        <a onClick={handleDrawerOpen}>
            <MenuIcon />
        </a>
    );
};

export const HeaderBar: React.FC<{}> = () => {
    const { user } = useSelector((state: RootState) => state.user);

    const isLogin = !!user;

    return (
        <React.Fragment>
            <AppBar className={'app-bar'}>
                <div className="open-drawer">
                    {isLogin && <FeatureButton />}
                </div>

                <div className="logo">
                    <a href="/">{'LOGO'}</a>
                </div>

                <nav>
                    <ul>
                        <li>
                            <a href="/admin">{'Admin'}</a>
                        </li>
                        <li>
                            <a href="/">{'About'}</a>
                        </li>
                        <li>
                            <a href="/">{'Contact'}</a>
                        </li>
                    </ul>
                </nav>

                <div className="auth-action">
                    {isLogin ? <ProfileButton /> : <LoginButton />}
                </div>
            </AppBar>
            <FeatureDrawer />
            <ProfileDrawer />
        </React.Fragment>
    );
};
