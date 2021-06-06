import produce from 'immer';
import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    createSlice,
    PayloadAction,
    SliceCaseReducers,
} from '@reduxjs/toolkit';

interface FetchState {
    isLoading: boolean;
    isError: boolean;
    data: any;
    message: string | undefined;
    queue: any[];
}

export const FetchSlice = createSlice<
    FetchState,
    SliceCaseReducers<FetchState>
>({
    name: 'fetch',
    initialState: {
        isLoading: false,
        isError: false,
        data: undefined,
        message: undefined,
        queue: [],
    },
    reducers: {
        start: (state: FetchState) => {
            return produce(state, (draft) => {
                draft.isLoading = true;
                draft.isError = false;
                draft.data = undefined;
                draft.message = undefined;
                // TODO event key queue
                draft.queue.push(Date.now());
            });
        },
        success: (state, action: PayloadAction<{ data: any | undefined }>) => {
            return produce(state, (draft) => {
                draft.data = action.payload.data;
            });
        },
        fail: (state, action: PayloadAction<{ error: any }>) => {
            return produce(state, (draft) => {
                draft.isError = true;
                draft.message = action.payload.error;
            });
        },
        end: (state: FetchState) => {
            return produce(state, (draft) => {
                draft.queue.pop();
                if (draft.queue.length <= 0) {
                    draft.isLoading = false;
                }
            });
        },
    },
});

const start = FetchSlice.actions.start as ActionCreatorWithoutPayload<string>;
const end = FetchSlice.actions.end as ActionCreatorWithoutPayload<string>;
const success = FetchSlice.actions.success as ActionCreatorWithPayload<{
    data: any | undefined;
}>;
const fail = FetchSlice.actions.fail as ActionCreatorWithPayload<{
    error: any;
}>;

export default { start, end, success, fail };
