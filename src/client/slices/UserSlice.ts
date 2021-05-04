import produce from 'immer';
import { Feature } from '../domain/user/Feature';
import { FeatureIconEnum } from '../domain/user/FeatureIcon';
import { PaginationVM } from '../models/PaginationVM';
import { UserVM } from '../domain/user/UserVM';
import {
    ActionCreatorWithoutPayload,
    ActionCreatorWithPayload,
    createSlice,
    PayloadAction,
    SliceCaseReducers,
} from "@reduxjs/toolkit";

export interface UserState {
    user?: UserVM
    features: Feature[]
    page_result?: PaginationVM<UserVM>
    fetch_user_refresh?: boolean
    invite_dialog?: {
        show: boolean
        inviting_user?: UserVM
        inviting_token?: string
        form?: {
            role_id?: string
            email?: string
            description?: string
        }
    }
}

export interface UserPayload {
    user?: UserVM
}

export interface UserPaginationPayload {
    page_result?: PaginationVM<UserVM>
}

const defaultInviteForm = {
    role_id: "",
    email: "",
    description: "",
}

const features: Feature[] = [
    {
        name: "Dashboard",
        icon: FeatureIconEnum.Dashboard,
        path: "/admin",
    },
    {
        name: "User Management",
        icon: FeatureIconEnum.User,
        path: "/user", //TODO
    },
    {
        name: "Project Management",
        icon: FeatureIconEnum.Project,
        path: "/project",
    },
    {
        name: "Spatial Topology",
        icon: FeatureIconEnum.Spatial,
        path: "/space",
    },
    {
        name: "Device Topology",
        icon: FeatureIconEnum.Device,
        path: "/device",
    },
    {
        name: "Group Management",
        icon: FeatureIconEnum.Group,
        path: "/group",
    },
    {
        name: "Data Migration",
        icon: FeatureIconEnum.Migration,
        path: "/migration",
    },
];

const getInitialState = (): UserState => {

    const state: UserState = {
        user: null,
        features: features,
        page_result: {
            offset: 0,
            limit: 50,
            total: 0,
            results: []
        },
        invite_dialog: {
            show: false,
            inviting_user: null,
            form: defaultInviteForm
        },
        fetch_user_refresh: true
    };

    return state
}

export const UserSlice = createSlice<
    UserState,
    SliceCaseReducers<UserState>,
    string
>({
    name: "user",
    initialState: getInitialState(),
    reducers: {
        initial: (state, action: PayloadAction<UserPayload>) => {
            return produce(state, (draft) => {
                const user = {
                    ...action.payload
                } as UserVM;

                draft.user = user;
            });
        },
        fetch: (state, action: PayloadAction<UserPaginationPayload>) => {
            return produce(state, (draft) => {
                const vm = {
                    ...action.payload
                } as PaginationVM<UserVM>;

                draft.fetch_user_refresh = false
                draft.page_result.results = vm.results;
                draft.page_result.offset = vm.offset + vm.results.length;
                draft.page_result.limit = vm.limit;
                draft.page_result.total = vm.total;
            });
        },
        push: (state, action: PayloadAction<UserPaginationPayload>) => {
            return produce(state, (draft) => {
                const vm = {
                    ...action.payload
                } as PaginationVM<UserVM>;

                const users = state.page_result.results.concat(vm.results);

                draft.page_result.results = users;
                draft.page_result.offset = vm.offset + vm.results.length;
                draft.page_result.limit = vm.limit;
                draft.page_result.total = vm.total;
            });
        },
        refresh: (state, action) => {
            return produce(state, (draft) => {
                draft.fetch_user_refresh = true
            });
        },
        showInviteDialog: (state, action: PayloadAction<boolean>) => {
            return produce(state, (draft) => {

                draft.invite_dialog.show = action.payload
            });
        },
        setInvitingUserInfo: (state, action: PayloadAction<{ user: UserVM, token: string }>) => {
            return produce(state, (draft) => {
                draft.invite_dialog.inviting_user = action.payload.user
                draft.invite_dialog.inviting_token = action.payload.token
            });
        },
        changeInviteUserForm: (state, action: PayloadAction<{ name: string, value: any }>) => {
            return produce(state, (draft) => {
                const name = action.payload.name;
                const value = action.payload.value;
                draft.invite_dialog.form[name] = value
            });
        },
        clearInviteUserForm: (state, action) => {
            return produce(state, (draft) => {
                draft.invite_dialog.form = defaultInviteForm;
                delete draft.invite_dialog.inviting_token;
                delete draft.invite_dialog.inviting_user;
            });
        },
    },
})

const initial = UserSlice.actions.initial as ActionCreatorWithPayload<UserPayload>;
const fetch = UserSlice.actions.fetch as ActionCreatorWithPayload<PaginationVM<UserVM>>;
const push = UserSlice.actions.push as ActionCreatorWithPayload<PaginationVM<UserVM>>;
const refresh = UserSlice.actions.refresh as ActionCreatorWithoutPayload<string>;

const showInviteDialog = UserSlice.actions.showInviteDialog as ActionCreatorWithPayload<boolean>;
const setInvitingUserInfo = UserSlice.actions.setInvitingUserInfo as ActionCreatorWithPayload<{ user: UserVM, token: string }>;

const changeInviteUserForm = UserSlice.actions.changeInviteUserForm as ActionCreatorWithPayload<{ name: string, value: any }>;
const clearInviteUserForm = UserSlice.actions.clearInviteUserForm as ActionCreatorWithoutPayload<string>;;

export default {
    initial, fetch, push, refresh,
    showInviteDialog, setInvitingUserInfo, changeInviteUserForm, clearInviteUserForm
}
