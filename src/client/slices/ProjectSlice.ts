import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    createSlice,
    PayloadAction,
    SliceCaseReducers,
} from "@reduxjs/toolkit";
import { produce } from 'immer';
import { ProjectPaginationVM } from '../domain/project/ProjectVM';

export interface ProjectState {
    page_result?: ProjectPaginationVM
    fetch_refresh?: boolean
    create_dialog: {
        show: boolean
        form: CreateProjectFrom
    }
}

interface CreateProjectFrom {
    name?: string;
    cloud_code_id?: number;
    expire_date?: number;
    // code?: string;
}

interface ProjectPaginationPayload {
    page_result?: ProjectPaginationVM
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
    };

    return state
}

export const ProjectSlice = createSlice<
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
    },
})

const fetch = ProjectSlice.actions.fetch as ActionCreatorWithPayload<ProjectPaginationVM>;
const refresh = ProjectSlice.actions.refresh as ActionCreatorWithoutPayload<string>;

const showCreateDialog = ProjectSlice.actions.showCreateDialog as ActionCreatorWithPayload<boolean>;
const changeCreateProjectForm = ProjectSlice.actions.changeCreateProjectForm as ActionCreatorWithPayload<{ name: string, value: any }>;

export default { fetch, refresh, showCreateDialog, changeCreateProjectForm }
