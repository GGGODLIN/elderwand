import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    AnyAction,
    createSlice,
    PayloadAction,
    Reducer,
    SliceCaseReducers,
} from '@reduxjs/toolkit';
import { produce } from 'immer';
import ProjectVM from 'src/client/domain/project/ProjectVM';
import PaginationVM from 'src/client/models/PaginationVM';

interface CreateProjectFrom {
    name?: string;
    cloud_code_id?: number;
    expire_date?: number;
    // code?: string;
}

interface AssignUserFrom { }

export interface ProjectState {
    page_result?: PaginationVM<ProjectVM>;
    fetch_refresh?: boolean;
    create_dialog: {
        show: boolean;
        form: CreateProjectFrom;
    };
    edit_dialog: {
        show: boolean;
        form: CreateProjectFrom;
        project: any;
    };
    assign_user_dialog: {
        show: boolean;
        form: AssignUserFrom;
    };
    selected: string[];
    start: string;
    checked: boolean;
}

const getInitialState = (): ProjectState => {
    const state: ProjectState = {
        page_result: {
            offset: 0,
            limit: 60,
            total: 0,
            results: [],
        },
        fetch_refresh: true,
        create_dialog: {
            show: false,
            form: {},
        },
        edit_dialog: {
            show: false,
            form: {},
            project: {}
        },
        assign_user_dialog: {
            show: false,
            form: {},
        },
        selected: [],
        start: '',
        checked: false,
    };

    return state;
};

const ProjectSlice = createSlice<
    ProjectState,
    SliceCaseReducers<ProjectState>,
    string
>({
    name: 'project',
    initialState: getInitialState(),
    reducers: {
        fetch: (state, action: PayloadAction<PaginationVM<ProjectVM>>) => {
            return produce(state, (draft) => {
                const vm = action.payload;

                draft.fetch_refresh = false;
                draft.page_result.offset = vm.offset + vm.results.length;
                draft.page_result.limit = vm.limit;
                draft.page_result.total = vm.total;
                draft.page_result.results = vm.results;
            });
        },
        refresh: (state, action) => {
            return produce(state, (draft) => {
                draft.fetch_refresh = true;
                draft.selected = [];
            });
        },
        showCreateDialog: (state, action: PayloadAction<boolean>) => {
            return produce(state, (draft) => {
                draft.create_dialog.show = action.payload;
            });
        },
        showEditDialog: (state, action: PayloadAction<boolean>) => {
            return produce(state, (draft) => {
                draft.edit_dialog.show = action.payload;
            });
        },
        assignEditProject: (
            state,
            action
        ) => {
            return produce(state, (draft) => {
                draft.edit_dialog.project = action.payload;
            });
        },
        changeCreateProjectForm: (
            state,
            action: PayloadAction<{ name: string; value: any }>
        ) => {
            return produce(state, (draft) => {
                const name = action.payload.name;
                const value = action.payload.value;
                draft.create_dialog.form[name] = value;
            });
        },
        showAssignUserDialog: (state, action: PayloadAction<boolean>) => {
            return produce(state, (draft) => {
                draft.assign_user_dialog.show = action.payload;
            });
        },
        selectRow: (state, action: PayloadAction<string>) => {
            return produce(state, (draft) => {
                draft.selected.push(action.payload);
            });
        },
        deselectRow: (state, action: PayloadAction<string>) => {
            return produce(state, (draft) => {
                draft.selected = state.selected.filter(
                    (item) => item != action.payload
                );
            });
        },
        selectAllRows: (state, action: PayloadAction<string>) => {
            return produce(state, (draft) => {
                draft.selected = state.page_result.results.map(
                    (item) => item.id
                );
            });
        },
        deselectAllRows: (state, action: PayloadAction<string>) => {
            return produce(state, (draft) => {
                draft.selected = [];
            });
        },
        setRangeStart: (
            state,
            action: PayloadAction<{ key: string; checked: boolean }>
        ) => {
            return produce(state, (draft) => {
                (draft.start = action.payload.key),
                    (draft.checked = action.payload.checked);
            });
        },
        setRangeSelect: (state, action: PayloadAction<string>) => {
            return produce(state, (draft) => {
                const projects = state.page_result.results.map(
                    (item) => item.id
                );
                const start = projects.indexOf(state.start);
                const end = projects.indexOf(action.payload);
                const items = projects.slice(start, end);

                if (draft.checked) {
                    draft.selected = Array.from(
                        new Set([...state.selected.concat(items)])
                    );
                    return;
                }

                draft.selected = state.selected.filter(
                    (item) => items.indexOf(item) < 0
                );
            });
        },
    },
});

type key = string | number;

const reducer = ProjectSlice.reducer as Reducer<ProjectState, AnyAction>;

const fetch = ProjectSlice.actions.fetch as ActionCreatorWithPayload<
    PaginationVM<ProjectVM>,
    string
>;
const refresh = ProjectSlice.actions
    .refresh as ActionCreatorWithoutPayload<string>;

const selectRow = ProjectSlice.actions.selectRow as ActionCreatorWithPayload<
    key,
    string
>;
const deselectRow = ProjectSlice.actions
    .deselectRow as ActionCreatorWithPayload<key, string>;
const selectAllRows = ProjectSlice.actions
    .selectAllRows as ActionCreatorWithoutPayload<string>;
const deselectAllRows = ProjectSlice.actions
    .deselectAllRows as ActionCreatorWithoutPayload<string>;

const setRangeStart = ProjectSlice.actions
    .setRangeStart as ActionCreatorWithPayload<
        { key: key; checked: boolean },
        string
    >;
const setRangeSelect = ProjectSlice.actions
    .setRangeSelect as ActionCreatorWithPayload<key, string>;

const showCreateDialog = ProjectSlice.actions
    .showCreateDialog as ActionCreatorWithPayload<boolean>;
const showEditDialog = ProjectSlice.actions
    .showEditDialog as ActionCreatorWithPayload<boolean>;
const assignEditProject = ProjectSlice.actions
    .assignEditProject as ActionCreatorWithPayload<{
        project: any;
    }>;
const changeCreateProjectForm = ProjectSlice.actions
    .changeCreateProjectForm as ActionCreatorWithPayload<{
        name: string;
        value: any;
    }>;

const showAssignUserDialog = ProjectSlice.actions
    .showAssignUserDialog as ActionCreatorWithPayload<boolean>;

export default {
    reducer,
    fetch,
    refresh,
    selectRow,
    deselectRow,
    selectAllRows,
    deselectAllRows,
    setRangeStart,
    setRangeSelect,
    showCreateDialog,
    showEditDialog,
    assignEditProject,
    changeCreateProjectForm,
    showAssignUserDialog,
};
