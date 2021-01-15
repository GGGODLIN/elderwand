import { produce } from 'immer';
import { ProjectPaginationVM } from '../domain/project/ProjectVM';
import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    AnyAction,
    createSlice,
    PayloadAction,
    Reducer,
    SliceCaseReducers,
} from "@reduxjs/toolkit";

interface CreateProjectFrom {
    name?: string;
    cloud_code_id?: number;
    expire_date?: number;
    // code?: string;
}

interface AssignUserFrom {

}

export interface ProjectState {
    page_result?: ProjectPaginationVM
    fetch_refresh?: boolean
    create_dialog: {
        show: boolean
        form: CreateProjectFrom
    },
    assign_user_dialog: {
        show: boolean
        form: AssignUserFrom
    },
    selected: string[]
    start: string
    checked: boolean
}

const getInitialState = (): ProjectState => {

    const state: ProjectState = {
        page_result: {
            offset: 0,
            limit: 60,
            total: 0,
            projects: [],
        },
        fetch_refresh: true,
        create_dialog: {
            show: false,
            form: {},
        },
        assign_user_dialog: {
            show: false,
            form: {},
        },
        selected: [],
        start: "",
        checked: false
    };

    return state
}

const ProjectSlice = createSlice<
    ProjectState,
    SliceCaseReducers<ProjectState>,
    string
>({
    name: "project",
    initialState: getInitialState(),
    reducers: {
        fetch: (state, action: PayloadAction<ProjectPaginationVM>) => {
            return produce(state, (draft) => {
                const vm = action.payload;

                draft.fetch_refresh = false
                draft.page_result.offset = vm.offset + vm.projects.length;
                draft.page_result.limit = vm.limit;
                draft.page_result.total = vm.total;
                draft.page_result.projects = vm.projects;
            });
        },
        refresh: (state, action) => {
            return produce(state, (draft) => {
                draft.fetch_refresh = true
                draft.selected = []
            });
        },
        showCreateDialog: (state, action: PayloadAction<boolean>) => {
            return produce(state, (draft) => {
                draft.create_dialog.show = action.payload
            });
        },
        changeCreateProjectForm: (state, action: PayloadAction<{ name: string, value: any }>) => {
            return produce(state, (draft) => {
                const name = action.payload.name;
                const value = action.payload.value;
                draft.create_dialog.form[name] = value
            });
        },
        showAssignUserDialog: (state, action: PayloadAction<boolean>) => {
            return produce(state, (draft) => {
                draft.assign_user_dialog.show = action.payload
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
                draft.selected = state.page_result.projects.map((item) => item.id);
            });
        },
        deselectAllRows: (state, action: PayloadAction<string>) => {
            return produce(state, (draft) => {
                draft.selected = [];
            });
        },
        setRangeStart: (state, action: PayloadAction<{ key: string, checked: boolean }>) => {
            return produce(state, (draft) => {

                draft.start = action.payload.key,
                    draft.checked = action.payload.checked
            });
        },
        setRangeSelect: (state, action: PayloadAction<string>) => {
            return produce(state, (draft) => {

                const projects = state.page_result.projects.map((item) => item.id);
                const start = projects.indexOf(state.start);
                const end = projects.indexOf(action.payload);
                const items = projects.slice(start, end);

                if (draft.checked) {
                    draft.selected = Array.from(new Set([...state.selected.concat(items)]));
                    return;
                }

                draft.selected = state.selected.filter((item) => items.indexOf(item) < 0);
            });
        },
    },
})

type key = string | number;

const reducer = ProjectSlice.reducer as Reducer<ProjectState, AnyAction>;

const fetch = ProjectSlice.actions.fetch as ActionCreatorWithPayload<ProjectPaginationVM, string>;
const refresh = ProjectSlice.actions.refresh as ActionCreatorWithoutPayload<string>;

const selectRow = ProjectSlice.actions.selectRow as ActionCreatorWithPayload<key, string>;
const deselectRow = ProjectSlice.actions.deselectRow as ActionCreatorWithPayload<key, string>;
const selectAllRows = ProjectSlice.actions.selectAllRows as ActionCreatorWithoutPayload<string>;
const deselectAllRows = ProjectSlice.actions.deselectAllRows as ActionCreatorWithoutPayload<string>;

const setRangeStart = ProjectSlice.actions.setRangeStart as ActionCreatorWithPayload<{ key: key, checked: boolean }, string>;
const setRangeSelect = ProjectSlice.actions.setRangeSelect as ActionCreatorWithPayload<key, string>;

const showCreateDialog = ProjectSlice.actions.showCreateDialog as ActionCreatorWithPayload<boolean>;
const changeCreateProjectForm = ProjectSlice.actions.changeCreateProjectForm as ActionCreatorWithPayload<{ name: string, value: any }>;

const showAssignUserDialog = ProjectSlice.actions.showAssignUserDialog as ActionCreatorWithPayload<boolean>;

export default {
    reducer, fetch, refresh,
    selectRow, deselectRow, selectAllRows, deselectAllRows, setRangeStart, setRangeSelect,
    showCreateDialog, changeCreateProjectForm,
    showAssignUserDialog
}
