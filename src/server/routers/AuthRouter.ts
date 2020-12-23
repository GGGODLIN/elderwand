import { AuthApiController } from '../controllers/AuthApiController';
import { AuthPageController } from '../controllers/AuthPageController';
import { KoaRouterFactory } from 'g13-web-shared/server/utils';
import compose, { Middleware } from 'koa-compose';
import { ParameterizedContext } from 'koa';
import { IRouterParamContext } from 'koa-router';

export class AuthRouter {
    static getPageRouter = ():
        Middleware<ParameterizedContext<any, IRouterParamContext<any, {}>>> => KoaRouterFactory.create("/", {
            login: {
                action: "/login",
                method: "GET",
                controller: AuthPageController.login()
            },
            logout: {
                action: "/logout",
                method: "GET",
                controller: AuthPageController.logout()
            },
            register: {
                action: "/register",
                method: "GET",
                controller: AuthPageController.register()
            }
            // /password/change
        })

    static getApiRouter = ():
        Middleware<ParameterizedContext<any, IRouterParamContext<any, {}>>> => KoaRouterFactory.create("/api", {
            login: {
                action: "/login",
                method: "POST",
                controller: AuthApiController.login()
            },
            logout: {
                action: "/logout",
                method: "POST",
                controller: AuthApiController.logout()
            },
            register: {
                action: "/register",
                method: "POST",
                controller: AuthApiController.register()
            }

            // /token
            // /password/change
            // /password/reset
        })

    static getRouters = ():
        Middleware<ParameterizedContext<any, IRouterParamContext<any, {}>>> => {
        const pages = AuthRouter.getPageRouter()
        const apis = AuthRouter.getApiRouter()
        return compose([pages, apis])
    }

}
