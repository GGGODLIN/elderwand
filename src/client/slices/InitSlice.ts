import {
    createSlice,
    PayloadAction,
    Reducer,
    SliceCaseReducers,
} from '@reduxjs/toolkit';
import produce from 'immer';

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

const reducer = InitSlice.reducer as Reducer<InitialState>;

const { initial } = InitSlice.actions;

export default { reducer, initial };
