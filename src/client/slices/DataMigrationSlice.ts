import { DevicePreviewVM, ProjectPreviewVM, SpacePreviewVM } from 'src/client/domain/migration/MigraionPreviewVM';
import { produce } from 'immer';
import { ProjectVM } from '../domain/project/ProjectVM';
import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    AnyAction,
    createSlice,
    PayloadAction,
    Reducer,
    SliceCaseReducers,
} from "@reduxjs/toolkit";

export interface DataMigrationState {
    projects: ProjectPreviewVM[]
    spaces: SpacePreviewVM[]
    devices: DevicePreviewVM[]
    project_selected: string
    import_project_dialog: {
        show: boolean
        projects: ProjectVM[]
    }
}

const getInitialState = (): DataMigrationState => {

    const state: DataMigrationState = {
        projects: [],
        spaces: [],
        devices: [],
        project_selected: "",
        import_project_dialog: {
            show: false,
            projects: [],
        }
    };

    return state
}

const SliceName = "migration";

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
                draft.projects = [];
                draft.spaces = [];
                draft.devices = [];
            });
        },
        fetchProjects: (state, action: PayloadAction<ProjectPreviewVM[]>) => {
            return produce(state, (draft) => {
                draft.projects = action.payload
            });
        },
        fetchSpaces: (state, action: PayloadAction<SpacePreviewVM[]>) => {
            return produce(state, (draft) => {
                draft.spaces = action.payload
            });
        },
        fetchDevices: (state, action: PayloadAction<DevicePreviewVM[]>) => {
            return produce(state, (draft) => {
                draft.devices = action.payload
            });
        },
        selectProject: (state, action: PayloadAction<string>) => {
            return produce(state, (draft) => {
                draft.project_selected = action.payload
            });
        },
        showImportProjectDialog: (state, action: PayloadAction<boolean>) => {
            return produce(state, (draft) => {
                draft.import_project_dialog.show = action.payload
            });
        },
    },
})

type key = string | number;

const reducer = DataMigrationSlice.reducer as Reducer<DataMigrationState, AnyAction>;

const clear = DataMigrationSlice.actions.clear as ActionCreatorWithoutPayload<string>;

const fetchProjects = DataMigrationSlice.actions.fetchProjects as ActionCreatorWithPayload<ProjectPreviewVM[], string>;
const fetchSpaces = DataMigrationSlice.actions.fetchSpaces as ActionCreatorWithPayload<SpacePreviewVM[], string>;

const fetchDevices = DataMigrationSlice.actions.fetchDevices as ActionCreatorWithPayload<DevicePreviewVM[], string>;

const selectProject = DataMigrationSlice.actions.selectProject as ActionCreatorWithPayload<string, string>;

const showImportProjectDialog = DataMigrationSlice.actions.showImportProjectDialog as ActionCreatorWithPayload<boolean, string>;

export default {
    reducer, clear, fetchProjects, fetchSpaces, fetchDevices, selectProject,
    showImportProjectDialog
}
