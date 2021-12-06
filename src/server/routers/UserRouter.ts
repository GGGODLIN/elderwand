import UserMaintainController from '../controllers/UserMaintainController';
import KoaRouterFactory, {
    KoaRouterFactoryOptions,
} from '../helpers/KoaRouterFactory';

export const UserRouterActions = {
    listUsers: () => `/api/users`,
    getUser: (uid: string) => `/api/users/${uid}`,
    me: () => `/api/user/me`,
    editUser: (uid: string) => `/api/users/${uid}`,
};

export default class UserRouter {
    static getApiRouter() {
        const options: KoaRouterFactoryOptions = {
            me: {
                name: 'get-user-with-token',
                action: '/user/me',
                method: 'GET',
                controller: UserMaintainController.getUserWithToken, // TODO
            },
            listUsers: {
                name: 'list-users',
                action: '/users',
                method: 'GET',
                controller: UserMaintainController.listUsers,
            },
            getUser: {
                name: 'get-user',
                action: '/users/:uid',
                method: 'GET',
                controller: UserMaintainController.getUser,
            },
            createUser: {
                name: 'create-user',
                action: '/users',
                method: 'POST',
                controller: UserMaintainController.createUser,
            },
            editUser: {
                name: 'edit-user',
                action: '/users/:uid',
                method: 'PUT',
                controller: UserMaintainController.editUser,
            },
            editUserPwd: {
                name: 'edit-user-password',
                action: '/password',
                method: 'PUT',
                controller: UserMaintainController.editUserPwd,
            }
        };

        return KoaRouterFactory.create('/api', options);
    }
    // static getPageRouter = () => KoaRouterFactory.create("/user", {
    // })
    //
    // static getApiRouter = () => KoaRouterFactory.create("/api", {
    //     me: {
    //         action: "/user/me",
    //         method: "GET",
    //         controller: UserApiController.getUserByToken() as any
    //     },
    //     // get: {
    //     //     action: "/users/:uid",
    //     //     method: "GET",
    //     //     controller: UserApiController.getUser()
    //     // },
    //     list: {
    //         action: "/users",
    //         method: "GET",
    //         controller: UserApiController.queryUsers() as any
    //     },
    //     invite: {
    //         action: "/invite/user",
    //         method: "POST",
    //         controller: UserApiController.inviteUser() as any
    //     },
    //     get_inviting_user: {
    //         action: "/invite/user",
    //         method: "GET",
    //         controller: UserApiController.getInvitingUser() as any
    //     },
    // })
    //
    // static getRouters = () => {
    //     const pages = UserRouter.getPageRouter()
    //     const apis = UserRouter.getApiRouter()
    //     return compose([pages, apis])
    // }
}
