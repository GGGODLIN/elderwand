import compose, { Middleware } from 'koa-compose';
import Koa, { ParameterizedContext } from 'koa';
import { AuthApiController } from '../__remove__/AuthApiController';
import { AuthPageController } from '../__remove__/AuthPageController';
import { IRouterParamContext } from 'koa-router';
import { KoaRouterFactory } from 'g13-web-shared/server/utils';

export class AuthRouter {
    static getPageRouter = (): Middleware<
        ParameterizedContext<any, IRouterParamContext<any, {}>>
    > =>
        KoaRouterFactory.create('/', {
            login: {
                action: '/login',
                method: 'GET',
                controller: AuthPageController.login() as any,
            },
            logout: {
                action: '/logout',
                method: 'GET',
                controller: AuthPageController.logout() as any,
            },
            register: {
                action: '/register',
                method: 'GET',
                controller: AuthPageController.register() as any,
            },
            // /password/change
        });

    static getApiRouter = (): Middleware<
        ParameterizedContext<any, IRouterParamContext<any, {}>>
    > =>
        KoaRouterFactory.create('/api', {
            login: {
                action: '/login',
                method: 'POST',
                controller: AuthApiController.login() as any,
            },
            logout: {
                action: '/logout',
                method: 'POST',
                controller: AuthApiController.logout() as any,
            },
            register: {
                action: '/register',
                method: 'POST',
                controller: AuthApiController.register() as any,
            },

            // /token
            // /password/change
            // /password/reset
        });

    static getRouters = () => {
        const pages = AuthRouter.getPageRouter();
        const apis = AuthRouter.getApiRouter();
        return compose([pages, apis]) as Koa.Middleware<any>;
    };
}
