import produce from 'immer';
import {
    createSlice,
    PayloadAction,
    SliceCaseReducers,
} from '@reduxjs/toolkit';

export class InitialState {
    title: string;
    name: string;
}

const getInitialState = (): InitialState => {
    const state: InitialState = {
        title: 'index',
        name: 'Index',
    };
    return state;
};

export interface InitialPayload {
    title?: string;
    name?: string;
}

export const InitSlice = createSlice<
    InitialState,
    SliceCaseReducers<InitialState>,
    string
>({
    name: 'init',
    initialState: getInitialState(),
    reducers: {
        initial: (state, action: PayloadAction<InitialPayload>) => {
            return produce(state, (draft) => {
                draft = Object.assign(state, action.payload);
            });
        },
    },
});

const { initial } = InitSlice.actions;

export default { initial };
