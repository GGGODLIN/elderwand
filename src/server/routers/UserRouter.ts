import compose from 'koa-compose';
import { KoaRouterFactory } from 'g13-web-shared/server/utils/KoaRouterFactory';
import { UserApiController } from '../controllers/UserApiController';

export class UserRouter {
    static getPageRouter = () => KoaRouterFactory.create("/user", {
    })

    static getApiRouter = () => KoaRouterFactory.create("/api", {
        me: {
            action: "/user/me",
            method: "GET",
            controller: UserApiController.getUserByToken()
        },
        // get: {
        //     action: "/users/:uid",
        //     method: "GET",
        //     controller: UserApiController.getUser()
        // },
        list: {
            action: "/users",
            method: "GET",
            controller: UserApiController.queryUsers()
        },
        invite: {
            action: "/invite/user",
            method: "POST",
            controller: UserApiController.inviteUser()
        },
        get_inviting_user: {
            action: "/invite/user",
            method: "GET",
            controller: UserApiController.getInvitingUser()
        },
    })

    static getRouters = () => {
        const pages = UserRouter.getPageRouter()
        const apis = UserRouter.getApiRouter()
        return compose([pages, apis])
    }

}
