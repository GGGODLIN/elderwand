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
import GatewayConnectionVM from 'src/client/domain/space/GatewayConnectionVM';
import SpaceVM, {
    DeviceVM,
    SpaceTopology,
} from 'src/client/domain/space/SpaceVM';
import PaginationVM from 'src/client/models/PaginationVM';

export interface SpaceMaintainState {
    projects: ProjectVM[];
    project_selected?: ProjectVM;
    spaces: SpaceVM[];
    space_selected?: SpaceVM;
    space_checked_map: {
        [key: string]: boolean;
    };
    space_topology_map: {
        [key: string]: SpaceTopology;
    };
    connections: GatewayConnectionVM[];
    gc_bind_modal: {
        open: boolean;
        connection?: GatewayConnectionVM;
        device?: DeviceVM;
    };
    gc_unbind_modal: {
        open: boolean;
        device?: DeviceVM;
    };
    client_ip?: string;
    remove_space_dialog: {
        open: boolean;
        project?: ProjectVM;
        space?: SpaceVM;
    };
    refreshSpaceFlag: boolean;
}

const getInitialState = (): SpaceMaintainState => {
    return {
        projects: [],
        project_selected: null,
        spaces: [],
        space_selected: null,
        space_checked_map: {},
        space_topology_map: {},
        connections: [],
        gc_bind_modal: {
            open: false,
            connection: null,
            device: null,
        },
        gc_unbind_modal: {
            open: false,
            device: null,
        },
        client_ip: null,
        remove_space_dialog: {
            open: false,
            project: null,
            space: null,
        },
        refreshSpaceFlag: false
    } as SpaceMaintainState;
};

const SliceName = 'space';

const SpaceSlice = createSlice<
    SpaceMaintainState,
    SliceCaseReducers<SpaceMaintainState>,
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
        fetchGatewayConnections: (
            state,
            action: PayloadAction<PaginationVM<GatewayConnectionVM>>
        ) => {
            return produce(state, (draft) => {
                // TODO from server side filter
                const device_map: { [key: string]: DeviceVM } = {};

                for (const key of Object.keys(state.space_topology_map)) {
                    for (const node of state.space_topology_map[key].nodes) {
                        for (const device of node.devices) {
                            device_map[device.imei] = device;
                        }
                    }
                }

                draft.connections = action.payload.results.map((conn) => {
                    return device_map[conn.imei]
                        ? {
                            ...conn,
                            isBound: true,
                        }
                        : conn;
                });
                console.log('draft.connections', draft.connections)
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
        selectProject: (state, action: PayloadAction<ProjectVM>) => {
            return produce(state, (draft) => {
                draft.project_selected = action.payload;
            });
        },
        fetchSpaces: (state, action: PayloadAction<PaginationVM<SpaceVM>>) => {
            return produce(state, (draft) => {
                draft.spaces = action.payload.results;
            });
        },
        fetchSpaceTopology: (state, action: PayloadAction<SpaceTopology>) => {
            return produce(state, (draft) => {
                // const space = action.payload;
                const root = action.payload.nodes.find(
                    (item) => !item.parentId
                );
                draft.space_topology_map[root.id] = action.payload;
            });
        },
        selectSpace: (state, action: PayloadAction<SpaceVM>) => {
            return produce(state, (draft) => {
                draft.space_selected = action.payload;
            });
        },
        clearSelected: (state, action: PayloadAction<SpaceVM>) => {
            return produce(state, (draft) => {
                draft.space_selected = null;
            });
        },
        setCheckbox: (state, action: PayloadAction<SpaceVM>) => {
            return produce(state, (draft) => {
                const target = action.payload;
                const checked = action.payload.checked;

                let leaves = [target.id] as string[];

                getAllLeaves(target, leaves, state.spaces);

                leaves.map((leaf: string) => {
                    draft.space_checked_map[leaf] = checked;
                });
            });
        },
        selectGatewayConnection: (
            state,
            action: PayloadAction<GatewayConnectionVM>
        ) => {
            return produce(state, (draft) => {
                draft.gc_bind_modal.connection = action.payload;
            });
        },
        selectGateway: (state, action: PayloadAction<DeviceVM>) => {
            return produce(state, (draft) => {
                draft.gc_bind_modal.device = action.payload;
                draft.gc_bind_modal.open = true;
            });
        },
        closeBindModal: (state, action: PayloadAction) => {
            return produce(state, (draft) => {
                draft.gc_bind_modal.connection = null;
                draft.gc_bind_modal.device = null;
                draft.gc_bind_modal.open = false;
            });
        },

        openUnBindModal: (state, action: PayloadAction<DeviceVM>) => {
            return produce(state, (draft) => {
                draft.gc_unbind_modal.device = action.payload;
                draft.gc_unbind_modal.open = true;
            });
        },
        closeUnBindModal: (state, action: PayloadAction) => {
            return produce(state, (draft) => {
                draft.gc_unbind_modal.device = null;
                draft.gc_unbind_modal.open = false;
            });
        },
        setClientIP: (state, action: PayloadAction<string>) => {
            return produce(state, (draft) => {
                draft.client_ip = action.payload;
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
        refreshSpace: (state) => {
            return produce(state, (draft) => {
                draft.refreshSpaceFlag = !state.refreshSpaceFlag
            });
        },
    },
});

function getAllLeaves(target: SpaceVM, dest: string[], source: SpaceVM[]) {
    let leaves = source.filter((space) => space.parentId == target.id);

    if (!leaves) {
        return;
    }

    leaves.map((leaf: SpaceVM) => {
        dest.push(leaf.id);
        const subs = source.filter((space) => space.parentId == leaf.id);
        if (!!subs) {
            getAllLeaves(leaf, dest, source);
        }
    });
}

type key = string | number;

const reducer = SpaceSlice.reducer as Reducer<SpaceMaintainState, AnyAction>;

const clear = SpaceSlice.actions.clear as ActionCreatorWithPayload<any, string>;

const fetchProjects = SpaceSlice.actions
    .fetchProjects as ActionCreatorWithPayload<PaginationVM<ProjectVM>, string>;

const selectProject = SpaceSlice.actions
    .selectProject as ActionCreatorWithPayload<ProjectVM, string>;

const fetchSpaces = SpaceSlice.actions.fetchSpaces as ActionCreatorWithPayload<
    PaginationVM<SpaceVM>,
    string
>;

const selectSpace = SpaceSlice.actions.selectSpace as ActionCreatorWithPayload<
    SpaceVM,
    string
>;

const fetchSpaceTopology = SpaceSlice.actions
    .fetchSpaceTopology as ActionCreatorWithPayload<SpaceTopology, string>;

const clearSelected = SpaceSlice.actions
    .clearSelected as ActionCreatorWithoutPayload;

const setCheckbox = SpaceSlice.actions.setCheckbox as ActionCreatorWithPayload<
    SpaceVM,
    string
>;

const fetchGatewayConnections = SpaceSlice.actions
    .fetchGatewayConnections as ActionCreatorWithPayload<
        PaginationVM<GatewayConnectionVM>
    >;

const selectGatewayConnection = SpaceSlice.actions
    .selectGatewayConnection as ActionCreatorWithPayload<GatewayConnectionVM>;

const selectGateway = SpaceSlice.actions
    .selectGateway as ActionCreatorWithPayload<DeviceVM>;

const closeBindModal = SpaceSlice.actions
    .closeBindModal as ActionCreatorWithoutPayload;

const openUnBindModal = SpaceSlice.actions
    .openUnBindModal as ActionCreatorWithPayload<DeviceVM>;

const closeUnBindModal = SpaceSlice.actions
    .closeUnBindModal as ActionCreatorWithoutPayload;

const setClientIP = SpaceSlice.actions
    .setClientIP as ActionCreatorWithPayload<string>;
const removeSpace = SpaceSlice.actions
    .removeSpace as ActionCreatorWithPayload<SpaceVM>;

const closeRemoveSpaceDialog = SpaceSlice.actions
    .closeRemoveSpaceDialog as ActionCreatorWithoutPayload;
const refreshSpace = SpaceSlice.actions
    .refreshSpace as ActionCreatorWithoutPayload;
export default {
    reducer,
    clear,
    fetchProjects,
    selectProject,
    fetchSpaces,
    selectSpace,
    fetchSpaceTopology,
    clearSelected,
    setCheckbox,
    fetchGatewayConnections,
    selectGatewayConnection,
    selectGateway,
    closeBindModal,
    openUnBindModal,
    closeUnBindModal,
    setClientIP,
    removeSpace,
    closeRemoveSpaceDialog,
    refreshSpace
};
