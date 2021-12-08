import produce from 'immer';
import UserVM from 'src/client/domain/user/UserVM';
import { ClientEnvVar } from '../configs/ClientEnvVar';
import { isUUID } from '../utils/ValidatorUtil';
import {
    ActionCreatorWithPayload,
    createSlice,
    PayloadAction,
    Reducer,
    SliceCaseReducers,
} from '@reduxjs/toolkit';

export class AuthState {
    register: {
        inviting_user?: UserVM;
        form: {
            id: string;
            account_id: string;
            username: string;
            display_name: string;
            password: string;
            password2: string;
            email: string;
            tel: string;
            address: string;
            company: string;
        };
    };
}

const getInitialState = (): AuthState => {
    const state: AuthState = {
        register: {
            form: {
                id: '',
                account_id: '',
                username: '',
                display_name: '',
                password: '',
                password2: '',
                email: '',
                tel: '',
                address: '',
                company: '',
            },
        },
    };
    return state;
};

export const AuthSlice = createSlice<
    AuthState,
    SliceCaseReducers<AuthState>,
    string
>({
    name: 'auth',
    initialState: getInitialState(),
    reducers: {
        setInvitingUser: (state, action: PayloadAction<{ user: UserVM }>) => {
            return produce(state, (draft) => {
                const user = action.payload.user;
                draft.register.form.id = user.id;
                draft.register.form.account_id = user.account_id;
                draft.register.form.email = user.email;
                // IF already have an account
                // draft.register.form.username = user.username;
                // draft.register.form.display_name = user.display_name;

                // if (ClientEnvVar.IsDev) {
                //     const name = isUUID(user.username)
                //         ? `test_${Date.now()}`
                //         : user.username;
                //     const password = 'password';

                //     draft.register.form.username = name;
                //     draft.register.form.display_name =
                //         user.display_name || name;
                //     draft.register.form.password = password;
                //     draft.register.form.password2 = password;
                //     draft.register.form.email = `${name}@mail.com`;
                //     draft.register.form.address = 'example address string';
                //     draft.register.form.tel = `${Date.now()}`;
                // }
            });
        },
        changeRegisterUserForm: (
            state,
            action: PayloadAction<{ name: string; value: any }>
        ) => {
            return produce(state, (draft) => {
                const name = action.payload.name;
                const value = action.payload.value;
                draft.register.form[name] = value;
            });
        },
    },
});

const reducer = AuthSlice.reducer as Reducer<AuthState>;

const setInvitingUser = AuthSlice.actions
    .setInvitingUser as ActionCreatorWithPayload<{ user: UserVM }>;

const changeRegisterUserForm = AuthSlice.actions
    .changeRegisterUserForm as ActionCreatorWithPayload<{
        name: string;
        value: any;
    }>;

export default { reducer, setInvitingUser, changeRegisterUserForm };
