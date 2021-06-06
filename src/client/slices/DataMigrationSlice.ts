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
import {
    DevicePreviewVM,
    ProjectPreviewVM,
    SpacePreviewVM,
} from 'src/client/domain/migration/MigraionPreviewVM';
import { ProjectVM } from '../domain/project/ProjectVM';

export interface DataMigrationState {
    projects: ProjectPreviewVM[];
    spaces: SpacePreviewVM[];
    devices: DevicePreviewVM[];
    project_selected?: ProjectPreviewVM;
    import_project_dialog: {
        show: boolean;
        projects: ProjectVM[];
    };
}

const getInitialState = (): DataMigrationState => {
    const state: DataMigrationState = {
        projects: [],
        spaces: [],
        devices: [],
        project_selected: null,
        import_project_dialog: {
            show: false,
            projects: [],
        },
    };

    return state;
};

const SliceName = 'migration';

const DataMigrationSlice = createSlice<
    DataMigrationState,
    SliceCaseReducers<DataMigrationState>,
    string
>({
    name: SliceName,
    initialState: getInitialState(),
    reducers: {
        clear: (state, action: PayloadAction<{}>) => {
            return produce(state, (draft) => {
                draft.project_selected = null;
                draft.projects = [];
                draft.spaces = [];
                draft.devices = [];
            });
        },
        fetchProjects: (state, action: PayloadAction<ProjectPreviewVM[]>) => {
            return produce(state, (draft) => {
                draft.projects = action.payload;
            });
        },

        fetchSpaces: (state, action: PayloadAction<SpacePreviewVM[]>) => {
            return produce(state, (draft) => {
                draft.spaces = action.payload;
            });
        },
        fetchDevices: (state, action: PayloadAction<DevicePreviewVM[]>) => {
            return produce(state, (draft) => {
                draft.devices = action.payload;
            });
        },
        selectProject: (state, action: PayloadAction<ProjectPreviewVM>) => {
            return produce(state, (draft) => {
                draft.project_selected = {
                    displayName: action.payload.displayName,
                    projectCode: action.payload.projectCode,
                    projectName: action.payload.projectName,
                    cloudCode: action.payload.cloudCode,
                    expDate: action.payload.expDate,
                    owner: action.payload.owner,
                } as ProjectPreviewVM;
                draft.spaces = action.payload.spaces;
                draft.devices = action.payload.devices;
            });
        },
        clearSelectedProject: (state, action: PayloadAction<{}>) => {
            return produce(state, (draft) => {
                draft.project_selected = null;
                draft.spaces = [];
                draft.devices = [];
            });
        },
        showImportProjectDialog: (state, action: PayloadAction<boolean>) => {
            return produce(state, (draft) => {
                draft.import_project_dialog.show = action.payload;
            });
        },
    },
});

// type key = string | number;

const reducer = DataMigrationSlice.reducer as Reducer<DataMigrationState>;

const clear = DataMigrationSlice.actions.clear as ActionCreatorWithoutPayload;

const fetchProjects = DataMigrationSlice.actions
    .fetchProjects as ActionCreatorWithPayload<ProjectPreviewVM[]>;

const fetchSpaces = DataMigrationSlice.actions
    .fetchSpaces as ActionCreatorWithPayload<SpacePreviewVM[]>;

const fetchDevices = DataMigrationSlice.actions
    .fetchDevices as ActionCreatorWithPayload<DevicePreviewVM[]>;

const selectProject = DataMigrationSlice.actions
    .selectProject as ActionCreatorWithPayload<ProjectPreviewVM>;

const clearSelectedProject = DataMigrationSlice.actions
    .clearSelectedProject as ActionCreatorWithoutPayload;

const showImportProjectDialog = DataMigrationSlice.actions
    .showImportProjectDialog as ActionCreatorWithPayload<boolean>;

export default {
    reducer,
    clear,
    fetchProjects,
    fetchSpaces,
    fetchDevices,
    selectProject,
    clearSelectedProject,
    showImportProjectDialog,
};
