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
    Icon,
    ProjectVM,
    SpaceTemplateVM,
    SpaceVM,
} from 'src/client/domain/device/DeviceVMs';
import PaginationVM from 'src/client/models/PaginationVM';

export interface DeviceMaintainState {
    icons: Icon[];
    projects: ProjectVM[];
    project_selected?: ProjectVM;
    spaces: SpaceVM[];
    space_selected?: SpaceVM;
    devices: DeviceVM[];
    device_selected?: DeviceVM;
    space_templates: SpaceTemplateVM[];
    space_template_selected?: SpaceTemplateVM;
    device_templates: DeviceTemplateVM[];
    device_templates_selected?: DeviceTemplateVM;
    place_device_to_space_dialog: {
        open: boolean;
        project?: ProjectVM;
        space?: SpaceVM;
        template?: DeviceTemplateVM;
    };
    place_device_to_device_dialog: {
        open: boolean;
        project?: ProjectVM;
        device?: DeviceVM;
        template?: DeviceTemplateVM;
    };
    change_device_location_dialog: {
        open: boolean;
        project?: ProjectVM;
        space?: SpaceVM;
        device?: DeviceVM;
    };
    change_device_parent_dialog: {
        open: boolean;
        project?: ProjectVM;
        parent?: DeviceVM;
        device?: DeviceVM;
    };
    unlink_parent_device_dialog: {
        open: boolean;
        project?: ProjectVM;
        device?: DeviceVM;
    };
    remove_device_dialog: {
        open: boolean;
        project?: ProjectVM;
        device: DeviceVM;
    };
    connect_device_to_device_dialog: {
        open: boolean;
        device?: DeviceVM;
        template?: DeviceTemplateVM;
    };
    add_space_dialog: {
        open: boolean;
        project?: ProjectVM;
        space_template?: SpaceTemplateVM;
        space?: SpaceVM;
    };
    change_space_parent_dialog: {
        open: boolean;
        project?: ProjectVM;
        space?: SpaceVM;
        parent?: SpaceVM;
    };
    remove_space_dialog: {
        open: boolean;
        project?: ProjectVM;
        space?: SpaceVM;
    };
    edit_device_setting_dialog: {
        open: boolean;
        project?: ProjectVM;
        space?: SpaceVM;
        device?: DeviceVM;
    };
}

const getInitialState = (): DeviceMaintainState => {
    return {
        icons: [],
        projects: [],
        project_selected: null,
        spaces: [],
        space_selected: null,
        devices: [],
        space_template_selected: null,
        space_templates: [],
        device_selected: null,
        device_templates: [],
        device_templates_selected: null,
        place_device_to_space_dialog: {
            open: false,
            project: null,
            space: null,
            template: null,
        },
        place_device_to_device_dialog: {
            open: false,
            project: null,
            device: null,
            template: null,
        },
        change_device_location_dialog: {
            open: false,
            project: null,
            space: null,
            device: null,
        },
        change_device_parent_dialog: {
            open: false,
            project: null,
            parent: null,
            device: null,
        },
        unlink_parent_device_dialog: {
            open: false,
            project: null,
            device: null,
        },
        remove_device_dialog: {
            open: false,
            project: null,
            device: null,
        },
        connect_device_to_device_dialog: {
            open: false,
            device: null,
            template: null,
        },
        add_space_dialog: {
            open: false,
            project: null,
            space_template: null,
            space: null,
        },
        change_space_parent_dialog: {
            open: false,
            project: null,
            space: null,
            parent: null,
        },
        remove_space_dialog: {
            open: false,
            project: null,
            space: null,
        },
        edit_device_setting_dialog: {
            open: false,
            project: null,
            space: null,
            device: null,
        },
    };
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
                draft.spaces = [];
                draft.space_selected = null;
                draft.devices = [];
                draft.device_selected = null;
            });
        },
        fetchIcons: (state, action: PayloadAction<PaginationVM<Icon>>) => {
            return produce(state, (draft) => {
                draft.icons = action.payload.results;
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
        fetchDeviceTopologyResources: (
            state,
            action: PayloadAction<{
                spaces: PaginationVM<SpaceVM>;
                devices: PaginationVM<DeviceVM>;
            }>
        ) => {
            return produce(state, (draft) => {
                draft.spaces = action.payload.spaces.results;
                draft.devices = action.payload.devices.results;
            });
        },
        clearDeviceTopologyResources: (state, action: PayloadAction<any>) => {
            return produce(state, (draft) => {
                draft.spaces = null;
                draft.devices = null;
            });
        },
        fetchSpaceTemplates: (
            state,
            action: PayloadAction<PaginationVM<SpaceTemplateVM>>
        ) => {
            return produce(state, (draft) => {
                draft.space_templates = action.payload.results;
            });
        },
        fetchDeviceTemplates: (
            state,
            action: PayloadAction<PaginationVM<DeviceTemplateVM>>
        ) => {
            return produce(state, (draft) => {
                draft.device_templates = action.payload.results;
            });
        },
        selectProject: (state, action: PayloadAction<ProjectVM>) => {
            return produce(state, (draft) => {
                draft.project_selected = action.payload;
            });
        },
        selectSpace: (state, action: PayloadAction<SpaceVM>) => {
            return produce(state, (draft) => {
                draft.space_selected = action.payload;
            });
        },
        selectDevice: (state, action: PayloadAction<DeviceVM>) => {
            return produce(state, (draft) => {
                draft.device_selected = action.payload;
            });
        },
        selectDeviceTemplate: (
            state,
            action: PayloadAction<DeviceTemplateVM>
        ) => {
            return produce(state, (draft) => {
                draft.device_templates_selected = action.payload;
            });
        },
        selectSpaceTemplate: (
            state,
            action: PayloadAction<SpaceTemplateVM>
        ) => {
            return produce(state, (draft) => {
                draft.space_template_selected = action.payload;
            });
        },
        // Place Device To Space with Device Template
        placeDeviceToSpace: (state, action: PayloadAction<SpaceVM>) => {
            return produce(state, (draft) => {
                draft.place_device_to_space_dialog = {
                    open: true,
                    project: state.project_selected,
                    template: state.device_templates_selected,
                    space: action.payload,
                };
            });
        },
        closePlaceDeviceToSpaceDialog: (state) => {
            return produce(state, (draft) => {
                draft.place_device_to_space_dialog = {
                    open: false,
                    project: null,
                    space: null,
                    template: null,
                };
            });
        },
        // Place Device To Device with Device Template
        placeDeviceToDevice: (state, action: PayloadAction<DeviceVM>) => {
            return produce(state, (draft) => {
                draft.place_device_to_device_dialog = {
                    open: true,
                    project: state.project_selected,
                    template: state.device_templates_selected,
                    device: action.payload,
                };
            });
        },
        closePlaceDeviceToDeviceDialog: (state) => {
            return produce(state, (draft) => {
                draft.place_device_to_device_dialog = {
                    open: false,
                    project: null,
                    device: null,
                    template: null,
                };
            });
        },
        // Change Device Location
        changeDeviceLocation: (state, action: PayloadAction<SpaceVM>) => {
            return produce(state, (draft) => {
                draft.change_device_location_dialog = {
                    open: true,
                    project: state.project_selected,
                    device: state.device_selected,
                    space: action.payload,
                };
            });
        },
        closeChangeDeviceLocationDialog: (state) => {
            return produce(state, (draft) => {
                draft.change_device_location_dialog = {
                    open: false,
                    project: null,
                    device: null,
                    space: null,
                };
            });
        },
        // DeviceParentDialog
        changeDeviceParent: (state, action: PayloadAction<DeviceVM>) => {
            return produce(state, (draft) => {
                draft.change_device_parent_dialog = {
                    open: true,
                    project: state.project_selected,
                    device: state.device_selected,
                    parent: action.payload,
                };
            });
        },
        closeChangeDeviceParentDialog: (state) => {
            return produce(state, (draft) => {
                draft.change_device_parent_dialog = {
                    open: false,
                    project: null,
                    device: null,
                    parent: null,
                };
            });
        },
        // Unlink Parent Device
        unlinkParentDevice: (state, action: PayloadAction<DeviceVM>) => {
            return produce(state, (draft) => {
                draft.unlink_parent_device_dialog = {
                    open: true,
                    project: state.project_selected,
                    device: action.payload,
                };
            });
        },
        closeUnlinkParentDeviceDialog: (state) => {
            return produce(state, (draft) => {
                draft.unlink_parent_device_dialog = {
                    open: false,
                    project: null,
                    device: null,
                };
            });
        },
        // Remove Device Dialog
        removeDevice: (state, action: PayloadAction<DeviceVM>) => {
            return produce(state, (draft) => {
                draft.remove_device_dialog = {
                    open: true,
                    project: state.project_selected,
                    device: action.payload,
                };
            });
        },
        closeRemoveDeviceDialog: (state) => {
            return produce(state, (draft) => {
                draft.remove_device_dialog = {
                    open: false,
                    project: null,
                    device: null,
                };
            });
        },
        // add space
        addSpace: (state, action: PayloadAction<SpaceVM>) => {
            return produce(state, (draft) => {
                draft.add_space_dialog = {
                    open: true,
                    project: state.project_selected,
                    space_template: state.space_template_selected,
                    space: action.payload,
                };
            });
        },
        closeAddSpaceDialog: (state) => {
            return produce(state, (draft) => {
                draft.add_space_dialog = {
                    open: false,
                    project: null,
                    space_template: null,
                    space: null,
                };
            });
        },
        // change space parent
        changeSpaceParent: (
            state,
            action: PayloadAction<{ space: SpaceVM; parent: SpaceVM }>
        ) => {
            return produce(state, (draft) => {
                draft.change_space_parent_dialog = {
                    open: true,
                    project: state.project_selected,
                    space: action.payload.space,
                    parent: action.payload.parent,
                };
            });
        },
        closeChangeSpaceParentDialog: (state) => {
            return produce(state, (draft) => {
                draft.change_space_parent_dialog = {
                    open: false,
                    project: null,
                    space: null,
                    parent: null,
                };
            });
        },
        // remove space
        removeSpace: (state, action: PayloadAction<SpaceVM>) => {
            return produce(state, (draft) => {
                draft.remove_space_dialog = {
                    open: true,
                    project: state.project_selected,
                    space: action.payload,
                };
            });
        },
        closeRemoveSpaceDialog: (state) => {
            return produce(state, (draft) => {
                draft.remove_space_dialog = {
                    open: false,
                    project: null,
                    space: null,
                };
            });
        },
        // edit device setting
        editDeviceSetting: (state, action: PayloadAction<DeviceVM>) => {
            return produce(state, (draft) => {
                const device = action.payload;

                draft.edit_device_setting_dialog = {
                    open: true,
                    project: device.project,
                    space: device.space,
                    device: device,
                };
            });
        },
        closeEditDeviceSettingDialog: (state) => {
            return produce(state, (draft) => {
                draft.edit_device_setting_dialog = {
                    open: false,
                    device: null,
                };
            });
        },
    },
});

type key = string | number;

const reducer = DeviceSlice.reducer as Reducer<DeviceMaintainState, AnyAction>;

const clear = DeviceSlice.actions.clear as ActionCreatorWithPayload<any>;
const clearProjectSelected = DeviceSlice.actions
    .clearProjectSelected as ActionCreatorWithoutPayload;

const fetchIcons = DeviceSlice.actions.fetchIcons as ActionCreatorWithPayload<
    PaginationVM<Icon>
>;

const fetchProjects = DeviceSlice.actions
    .fetchProjects as ActionCreatorWithPayload<PaginationVM<ProjectVM>>;

const fetchSpaces = DeviceSlice.actions.fetchSpaces as ActionCreatorWithPayload<
    PaginationVM<SpaceVM>
>;
const fetchDevices = DeviceSlice.actions
    .fetchDevices as ActionCreatorWithPayload<PaginationVM<DeviceVM>>;

const fetchDeviceTopologyResources = DeviceSlice.actions
    .fetchDeviceTopologyResources as ActionCreatorWithPayload<{
    spaces: PaginationVM<SpaceVM>;
    devices: PaginationVM<DeviceVM>;
}>;

const clearDeviceTopologyResources = DeviceSlice.actions
    .clearDeviceTopologyResources as ActionCreatorWithoutPayload;

const fetchSpaceTemplates = DeviceSlice.actions
    .fetchSpaceTemplates as ActionCreatorWithPayload<
    PaginationVM<SpaceTemplateVM>
>;

const fetchDeviceTemplates = DeviceSlice.actions
    .fetchDeviceTemplates as ActionCreatorWithPayload<
    PaginationVM<DeviceTemplateVM>
>;

const selectProject = DeviceSlice.actions
    .selectProject as ActionCreatorWithPayload<ProjectVM>;

const selectSpace = DeviceSlice.actions
    .selectSpace as ActionCreatorWithPayload<SpaceVM>;

const selectDevice = DeviceSlice.actions
    .selectDevice as ActionCreatorWithPayload<DeviceVM>;

const selectDeviceTemplate = DeviceSlice.actions
    .selectDeviceTemplate as ActionCreatorWithPayload<DeviceTemplateVM>;

const selectSpaceTemplate = DeviceSlice.actions
    .selectSpaceTemplate as ActionCreatorWithPayload<SpaceTemplateVM>;

const placeDeviceToSpace = DeviceSlice.actions
    .placeDeviceToSpace as ActionCreatorWithPayload<SpaceVM>;

const closePlaceDeviceToSpaceDialog = DeviceSlice.actions
    .closePlaceDeviceToSpaceDialog as ActionCreatorWithoutPayload;

const placeDeviceToDevice = DeviceSlice.actions
    .placeDeviceToDevice as ActionCreatorWithPayload<DeviceVM>;

const closePlaceDeviceToDeviceDialog = DeviceSlice.actions
    .closePlaceDeviceToDeviceDialog as ActionCreatorWithoutPayload;

const changeDeviceLocation = DeviceSlice.actions
    .changeDeviceLocation as ActionCreatorWithPayload<SpaceVM>;

const closeChangeDeviceLocationDialog = DeviceSlice.actions
    .closeChangeDeviceLocationDialog as ActionCreatorWithoutPayload;

const changeDeviceParent = DeviceSlice.actions
    .changeDeviceParent as ActionCreatorWithPayload<DeviceVM>;

const closeChangeDeviceParentDialog = DeviceSlice.actions
    .closeChangeDeviceParentDialog as ActionCreatorWithoutPayload;

const unlinkParentDevice = DeviceSlice.actions
    .unlinkParentDevice as ActionCreatorWithPayload<DeviceVM>;

const closeUnlinkParentDeviceDialog = DeviceSlice.actions
    .closeUnlinkParentDeviceDialog as ActionCreatorWithoutPayload;

const removeDevice = DeviceSlice.actions
    .removeDevice as ActionCreatorWithPayload<DeviceVM>;

const closeRemoveDeviceDialog = DeviceSlice.actions
    .closeRemoveDeviceDialog as ActionCreatorWithoutPayload;

const addSpace = DeviceSlice.actions
    .addSpace as ActionCreatorWithPayload<SpaceVM>;

const closeAddSpaceDialog = DeviceSlice.actions
    .closeAddSpaceDialog as ActionCreatorWithoutPayload;

const changeSpaceParent = DeviceSlice.actions
    .changeSpaceParent as ActionCreatorWithPayload<{
    space: SpaceVM;
    parent: SpaceVM;
}>;

const closeChangeSpaceParentDialog = DeviceSlice.actions
    .closeChangeSpaceParentDialog as ActionCreatorWithoutPayload;

const removeSpace = DeviceSlice.actions
    .removeSpace as ActionCreatorWithPayload<SpaceVM>;

const closeRemoveSpaceDialog = DeviceSlice.actions
    .closeRemoveSpaceDialog as ActionCreatorWithoutPayload;

const editDeviceSetting = DeviceSlice.actions
    .editDeviceSetting as ActionCreatorWithPayload<DeviceVM>;

const closeEditDeviceSettingDialog = DeviceSlice.actions
    .closeEditDeviceSettingDialog as ActionCreatorWithoutPayload;

export default {
    reducer,
    clear,
    clearProjectSelected,
    fetchIcons,
    fetchProjects,
    fetchSpaces,
    fetchDevices,
    fetchDeviceTopologyResources,
    clearDeviceTopologyResources,
    fetchSpaceTemplates,
    fetchDeviceTemplates,
    selectProject,
    selectSpace,
    selectDevice,
    selectDeviceTemplate,
    selectSpaceTemplate,
    placeDeviceToSpace,
    closePlaceDeviceToSpaceDialog,
    placeDeviceToDevice,
    closePlaceDeviceToDeviceDialog,
    changeDeviceLocation,
    closeChangeDeviceLocationDialog,
    changeDeviceParent,
    closeChangeDeviceParentDialog,
    unlinkParentDevice,
    closeUnlinkParentDeviceDialog,
    removeDevice,
    closeRemoveDeviceDialog,
    addSpace,
    closeAddSpaceDialog,
    changeSpaceParent,
    closeChangeSpaceParentDialog,
    removeSpace,
    closeRemoveSpaceDialog,
    editDeviceSetting,
    closeEditDeviceSettingDialog,
};
