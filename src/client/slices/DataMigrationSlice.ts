import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
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
import ProjectVM from 'src/client/domain/project/ProjectVM';

export interface DataMigrationState {
    projects: ProjectPreviewVM[];
    spaces: SpacePreviewVM[];
    devices: DevicePreviewVM[];
    project_selected?: ProjectPreviewVM;
    import_project_dialog: {
        show: boolean;
        projects: ProjectVM[];
    };
    import_device_template_dialog: {
        show: boolean;
    };
    import_space_template_dialog: {
        open: boolean;
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
        import_device_template_dialog: {
            show: false,
        },
        import_space_template_dialog: {
            open: false,
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
                // draft.project_selected = {
                //     displayName: action.payload.displayName,
                //     projectCode: action.payload.projectCode,
                //     projectName: action.payload.projectName,
                //     cloudCode: action.payload.cloudCode,
                //     expDate: action.payload.expDate,
                //     owner: action.payload.owner,
                // } as ProjectPreviewVM;
                draft.project_selected = {
                    ...action.payload,
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
        showImportDeviceTemplateDialog: (
            state,
            action: PayloadAction<boolean>
        ) => {
            return produce(state, (draft) => {
                draft.import_device_template_dialog.show = action.payload;
            });
        },
        importSpaceTemplate: (state, action: PayloadAction<unknown>) => {
            return produce(state, (draft) => {
                // TODO action payload
                draft.import_space_template_dialog.open = true;
            });
        },
        closeImportSpaceTemplateDialog: (state) => {
            return produce(state, (draft) => {
                draft.import_space_template_dialog.open = false;
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

const showImportDeviceTemplateDialog = DataMigrationSlice.actions
    .showImportDeviceTemplateDialog as ActionCreatorWithPayload<boolean>;

const importSpaceTemplate = DataMigrationSlice.actions
    .importSpaceTemplate as ActionCreatorWithPayload<unknown>;

const closeImportSpaceTemplateDialog = DataMigrationSlice.actions
    .closeImportSpaceTemplateDialog as ActionCreatorWithoutPayload;

export default {
    reducer,
    clear,
    fetchProjects,
    fetchSpaces,
    fetchDevices,
    selectProject,
    clearSelectedProject,
    showImportProjectDialog,
    showImportDeviceTemplateDialog,

    importSpaceTemplate,
    closeImportSpaceTemplateDialog,
};
