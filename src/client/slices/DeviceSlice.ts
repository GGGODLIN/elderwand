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
import DeviceVM, {
    DeviceTemplateVM,
    ProjectVM,
    SpaceVM,
} from 'src/client/domain/device/DeviceVMs';
import PaginationVM from 'src/client/models/PaginationVM';

export interface DeviceMaintainState {
    projects: ProjectVM[];
    project_selected?: ProjectVM;
    spaces: SpaceVM[];
    space_selected?: SpaceVM;
    devices: DeviceVM[];
    device_selected?: DeviceVM;
    device_templates: DeviceTemplateVM[];
    device_templates_selected?: DeviceTemplateVM;
}

const getInitialState = (): DeviceMaintainState => {
    return {
        projects: [],
        project_selected: null,
        spaces: [],
        space_selected: null,
        devices: [],
        device_selected: null,
        device_templates: [],
        device_templates_selected: null,
    } as DeviceMaintainState;
};

const SliceName = 'device';

const DeviceSlice = createSlice<
    DeviceMaintainState,
    SliceCaseReducers<DeviceMaintainState>,
    string
>({
    name: SliceName,
    initialState: getInitialState(),
    reducers: {
        clear: (state, action: PayloadAction<any>) => {
            return produce(state, (draft) => {
                console.log('clear');
            });
        },
        clearProjectSelected: (state, action: PayloadAction<any>) => {
            return produce(state, (draft) => {
                draft.project_selected = null;
            });
        },
        selectProject: (state, action: PayloadAction<ProjectVM>) => {
            return produce(state, (draft) => {
                draft.project_selected = action.payload;
            });
        },
        fetchProjects: (
            state,
            action: PayloadAction<PaginationVM<ProjectVM>>
        ) => {
            return produce(state, (draft) => {
                draft.projects = action.payload.results;
            });
        },
        fetchSpaces: (state, action: PayloadAction<PaginationVM<SpaceVM>>) => {
            return produce(state, (draft) => {
                draft.spaces = action.payload.results as any;
            });
        },
        fetchDevices: (
            state,
            action: PayloadAction<PaginationVM<DeviceVM>>
        ) => {
            return produce(state, (draft) => {
                draft.devices = action.payload.results as any;
            });
        },
        fetchDeviceTemplates: (
            state,
            action: PayloadAction<PaginationVM<DeviceTemplateVM>>
        ) => {
            return produce(state, (draft) => {
                draft.device_templates = action.payload.results as any;
            });
        },
    },
});

type key = string | number;

const reducer = DeviceSlice.reducer as Reducer<DeviceMaintainState, AnyAction>;

const clear = DeviceSlice.actions.clear as ActionCreatorWithPayload<any>;
const clearProjectSelected = DeviceSlice.actions
    .clearProjectSelected as ActionCreatorWithoutPayload;

const selectProject = DeviceSlice.actions
    .selectProject as ActionCreatorWithPayload<ProjectVM>;

const fetchProjects = DeviceSlice.actions
    .fetchProjects as ActionCreatorWithPayload<PaginationVM<ProjectVM>>;
const fetchSpaces = DeviceSlice.actions.fetchSpaces as ActionCreatorWithPayload<
    PaginationVM<SpaceVM>
>;
const fetchDevices = DeviceSlice.actions
    .fetchDevices as ActionCreatorWithPayload<PaginationVM<DeviceVM>>;

const fetchDeviceTemplates = DeviceSlice.actions
    .fetchDeviceTemplates as ActionCreatorWithPayload<
    PaginationVM<DeviceTemplateVM>
>;

export default {
    reducer,
    clear,
    clearProjectSelected,
    selectProject,
    fetchProjects,
    fetchSpaces,
    fetchDevices,
    fetchDeviceTemplates,
};
