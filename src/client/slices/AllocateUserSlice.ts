import { PaginationVM } from 'src/client/models/PaginationVM';
import { produce } from 'immer';
import { UserVM } from 'src/client/domain/user/UserVM';
import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    createSlice,
    PayloadAction,
    SliceCaseReducers,
} from "@reduxjs/toolkit";

interface AvailableUserState {
    users: UserVM[]
    selected: string[]
    start: string
    checked: boolean
}

const getInitialState = () => {
    const state = {
        users: [],
        selected: [],
        start: "",
        checked: false,
    };
    return state;
}
//

const AllocateUserSlice = createSlice<
    AvailableUserState,
    SliceCaseReducers<AvailableUserState>,
    string
>({
    name: "allocate_user",
    initialState: getInitialState(),
    reducers: {
        clear: (state, action: PayloadAction<PaginationVM<UserVM>>) => {
            return produce(state, (draft) => {
                draft.users = [];
                draft.selected = [];
            });
        },
        fetch: (state, action: PayloadAction<PaginationVM<UserVM>>) => {
            return produce(state, (draft) => {
                draft.users = action.payload.results;
            });
        },
        push: (state, action: PayloadAction<UserVM[]>) => {
            return produce(state, (draft) => {
                const users = action.payload;
                draft.users = state.users.concat(users);
            });
        },
        remove: (state, action: PayloadAction<string[]>) => {
            return produce(state, (draft) => {
                const selected = action.payload;
                draft.users = state.users.filter((item) => selected.indexOf(item.id) < 0);
            });
        },
        selectRow: (state, action: PayloadAction<string>) => {
            return produce(state, (draft) => {
                draft.selected.push(action.payload)
            });
        },
        deselectRow: (state, action: PayloadAction<string>) => {
            return produce(state, (draft) => {
                draft.selected = state.selected.filter((item) => item != action.payload)
            });
        },
        selectAllRows: (state, action: PayloadAction<string>) => {
            return produce(state, (draft) => {
                draft.selected = state.users.map((item) => item.id);
            });
        },
        deselectAllRows: (state, action: PayloadAction<string>) => {
            return produce(state, (draft) => {
                draft.selected = [];
            });
        },
        setRangeStart: (state, action: PayloadAction<{ key: string, checked: boolean }>) => {
            return produce(state, (draft) => {
                draft.start = action.payload.key;
                draft.checked = action.payload.checked;
            });
        },
        setRangeSelect: (state, action: PayloadAction<string>) => {
            return produce(state, (draft) => {

                const projects = state.users.map((item) => item.id);
                const start = projects.indexOf(state.start);
                const end = projects.indexOf(action.payload);
                const items = projects.slice(start, end);

                draft.selected = draft.checked
                    ? Array.from(new Set([...state.selected.concat(items)]))
                    : state.selected.filter((item) => items.indexOf(item) < 0);
            });
        },
    },
})

type key = string | number;

const reducer = AllocateUserSlice.reducer

const clear = AllocateUserSlice.actions.clear as ActionCreatorWithoutPayload<string>;
const fetch = AllocateUserSlice.actions.fetch as ActionCreatorWithPayload<PaginationVM<UserVM>, string>;
const push = AllocateUserSlice.actions.push as ActionCreatorWithPayload<UserVM[], string>;
const remove = AllocateUserSlice.actions.remove as ActionCreatorWithPayload<key[], string>;

const selectRow = AllocateUserSlice.actions.selectRow as ActionCreatorWithPayload<key, string>;
const deselectRow = AllocateUserSlice.actions.deselectRow as ActionCreatorWithPayload<key, string>;
const selectAllRows = AllocateUserSlice.actions.selectAllRows as ActionCreatorWithoutPayload<string>;
const deselectAllRows = AllocateUserSlice.actions.deselectAllRows as ActionCreatorWithoutPayload<string>;

const setRangeStart = AllocateUserSlice.actions.setRangeStart as ActionCreatorWithPayload<{ key: key, checked: boolean }, string>;
const setRangeSelect = AllocateUserSlice.actions.setRangeSelect as ActionCreatorWithPayload<key, string>;

export default {
    reducer, clear, fetch, push, remove,
    selectRow, deselectRow, selectAllRows, deselectAllRows, setRangeStart, setRangeSelect,
}
