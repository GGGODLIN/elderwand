import { PaginationVM } from 'src/client/models/PaginationVM';
import { produce } from 'immer';
import { ProjectVM } from 'src/client/domain/project/ProjectVM';
import { SpaceVM } from 'src/client/domain/space/SpaceVM';
import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    AnyAction,
    createSlice,
    PayloadAction,
    Reducer,
    SliceCaseReducers,
} from '@reduxjs/toolkit';

export interface SpaceMaintainState {
    projects: ProjectVM[];
    project_selected: ProjectVM;
    spaces: SpaceVM[];
    space_selected: SpaceVM;
    space_checked_map: {
        [key: string]: boolean;
    };
}

const getInitialState = (): SpaceMaintainState => {
    // const spaces = require("src/test/fixture/spaces.json");
    const state: SpaceMaintainState = {
        projects: [],
        spaces: [],
        project_selected: null,
        space_selected: null,
        space_checked_map: {},
    };

    return state;
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
                const spaces = action.payload.results.map((space) => {
                    return Array.isArray(space.leaves)
                        ? space
                        : ({ ...space, leaves: [] } as SpaceVM);
                });
                draft.spaces = spaces;
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
    },
});

function getAllLeaves(target: SpaceVM, dest: string[], source: SpaceVM[]) {
    let leaves = source.filter((space) => space.parent_id == target.id);

    if (!leaves) {
        return;
    }

    leaves.map((leaf: SpaceVM) => {
        dest.push(leaf.id);
        const subs = source.filter((space) => space.parent_id == leaf.id);
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

const clearSelected = SpaceSlice.actions
    .clearSelected as ActionCreatorWithPayload<any, string>;

const setCheckbox = SpaceSlice.actions.setCheckbox as ActionCreatorWithPayload<
    SpaceVM,
    string
>;

export default {
    reducer,
    clear,
    fetchProjects,
    selectProject,
    fetchSpaces,
    selectSpace,
    clearSelected,
    setCheckbox,
};
