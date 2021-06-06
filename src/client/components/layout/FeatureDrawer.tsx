import * as React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import clsx from 'clsx';
import LayoutSlice from 'src/client/slices/LayoutSlice';
import { Divider, Drawer, Tooltip } from '@material-ui/core';
import { Feature } from 'src/client/domain/user/Feature';
import { RootState } from 'src/client/reducer';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
    FeatureIconEnum,
    FeatureIconMap,
} from 'src/client/domain/user/FeatureIcon';

export interface FeatureButtonProps {
    name: string;
    icon: FeatureIconEnum;
    path: string;
}

export const FeatureButton: React.FC<FeatureButtonProps> = (props) => {
    return (
        <a href={props.path}>
            <Tooltip title={props.name} placement="right">
                {FeatureIconMap[props.icon]}
            </Tooltip>
            <Typography>{props.name}</Typography>
        </a>
    );
};

export interface FeatureListProps {
    features: Feature[];
}

export const FeatureList: React.FC<FeatureListProps> = (props) => {
    const elements = props.features.map((feature, idx) => {
        return (
            <li key={idx}>
                <FeatureButton
                    name={feature.name}
                    icon={feature.icon}
                    path={feature.path}
                />
            </li>
        );
    });

    return <ul>{elements}</ul>;
};

export const FeatureDrawer: React.FC<{}> = () => {
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        dispatch(LayoutSlice.openFeatureDrawer(true));
    };

    const handleDrawerClose = () => {
        dispatch(LayoutSlice.openFeatureDrawer(false));
    };

    const { display, open } = useSelector(
        (state: RootState) => state.layout.feature_drawer
    );

    const { features } = useSelector((state: RootState) => state.user);

    const drawer = clsx('feature-drawer', open ? 'open' : '');
    const mask = clsx('mask', open ? 'open' : '');

    if (!display) {
        return <React.Fragment />;
    }

    return (
        <React.Fragment>
            <Drawer className={drawer} variant="permanent" anchor={'left'}>
                <div className="drawer-header">
                    <div className="logo">
                        <a>{'LOGO'}</a>
                    </div>
                    <div className="close-drawer">
                        <a onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </a>
                    </div>
                </div>
                <Divider />
                <div className="drawer-content">
                    <FeatureList features={features} />
                    <div className="fill" onClick={handleDrawerOpen} />
                </div>
            </Drawer>
            <div className={mask} onClick={handleDrawerClose} />
        </React.Fragment>
    );
};
