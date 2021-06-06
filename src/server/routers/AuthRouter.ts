import { IRouterContext } from 'koa-router';
import { ServerEnvVar } from '../config/ServerEnvVar';
import AuthController from '../controllers/AuthController';
import RequestToken from '../domain/shared/types/RequestToken';
import KoaRouterFactory, {
    KoaRouterFactoryOptions,
} from '../helpers/KoaRouterFactory';
import AuthUtil from '../utils/AuthUtil';

export const AuthPageRouterActions = {
    login: () => `/login`,
    logout: () => `/logout`,
};

export const AuthApiRouterActions = {
    login: () => `/api/login`,
    logout: () => `/api/logout`,
};

export default class AuthRouter {
    static getPageRouter() {
        const options: KoaRouterFactoryOptions = {
            login: {
                name: 'login',
                action: '/login',
                method: 'GET',
                controller: async (
                    ctx: IRouterContext & RequestToken,
                    next
                ) => {
                    const token = AuthUtil.getToken(
                        ctx,
                        ServerEnvVar.JwtSecret
                    );

                    if (!token) {
                        await next();
                        return;
                    }

                    const verify = AuthUtil.verify(
                        token,
                        ServerEnvVar.JwtSecret
                    );

                    if (!verify) {
                        await next();
                        return;
                    }

                    ctx.status = 200;
                    ctx.redirect('/admin');
                },
            },
            logout: {
                name: 'logout',
                action: '/logout',
                method: 'GET',
                controller: (ctx) => {
                    ctx.status = 200;
                    ctx.cookies.set(ServerEnvVar.TokenKey, '', { maxAge: -1 });
                    ctx.redirect('/login');
                },
            },
        };

        return KoaRouterFactory.create('/', options);
    }

    static getApiRouter() {
        const options: KoaRouterFactoryOptions = {
            login: {
                name: 'login',
                action: '/login',
                method: 'POST',
                controller: AuthController.login,
            },
            // logout: {
            //     name: 'logout',
            //     action: '/logout',
            //     method: 'GET',
            //     controller: AuthController.logout,
            // },
        };

        return KoaRouterFactory.create('/api', options);
    }
}
