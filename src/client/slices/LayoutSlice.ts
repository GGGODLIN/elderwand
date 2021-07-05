import produce from 'immer';
import {
    createSlice,
    PayloadAction,
    Reducer,
    SliceCaseReducers,
} from '@reduxjs/toolkit';
import { InitialState, InitSlice } from './InitSlice';

export interface LayoutState {
    header: {
        display: boolean;
    };
    main: {
        display: boolean;
    };
    footer: {
        display: boolean;
    };
    overlay: {
        display: boolean;
    };
    feature_drawer: {
        display: boolean;
        open: boolean;
    };
    profile_drawer: {
        display: boolean;
        open: boolean;
    };
    goto_top: {
        display: boolean;
        show: boolean;
    };
}

export interface LayoutPayload {
    header?: {
        display?: boolean;
    };
    main?: {
        display?: boolean;
    };
    footer?: {
        display?: boolean;
    };
    overlay?: {
        display?: boolean;
    };
    feature_drawer?: {
        display?: boolean;
        open?: boolean;
    };
    profile_drawer?: {
        display?: boolean;
        open?: boolean;
    };
    goto_top?: {
        display?: boolean;
        show?: boolean;
    };
}

const getInitialState = (): LayoutState => {
    const state: LayoutState = {
        header: {
            display: true,
        },
        main: {
            display: true,
        },
        footer: {
            display: true,
        },
        overlay: {
            display: true,
        },
        feature_drawer: {
            display: false,
            open: false,
        },
        profile_drawer: {
            display: false,
            open: false,
        },
        goto_top: {
            display: false,
            show: false,
        },
    };
    return state;
};

export const LayoutSlice = createSlice<
    LayoutState,
    SliceCaseReducers<LayoutState>,
    string
>({
    name: 'layout',
    initialState: getInitialState(),
    reducers: {
        initial: (state, action: PayloadAction<LayoutPayload>) => {
            return produce(state, (draft) => {
                draft = Object.assign(state, action.payload);
            });
        },
        openFeatureDrawer: (state, action: PayloadAction<boolean>) => {
            return produce(state, (draft) => {
                draft.feature_drawer.open = action.payload;
            });
        },
        openProfileDrawer: (state, action: PayloadAction<boolean>) => {
            return produce(state, (draft) => {
                draft.profile_drawer.open = action.payload;
            });
        },
        showGotoTop: (state, action: PayloadAction<boolean>) => {
            return produce(state, (draft) => {
                draft.goto_top.show = action.payload;
            });
        },
    },
});

const reducer = LayoutSlice.reducer as Reducer<LayoutState>;

const { initial, openFeatureDrawer, openProfileDrawer, showGotoTop } =
    LayoutSlice.actions;

export default {
    reducer,
    initial,
    openFeatureDrawer,
    openProfileDrawer,
    showGotoTop,
};
