import Router, { IRouterParamContext } from 'koa-router';
import { AuthUserRepository } from 'g13-web-shared/server/user/repositories';
import { AuthUtil } from 'g13-web-shared/server/user';
import { ParameterizedContext } from 'koa';
import { ServerEnvVar } from '../config/ServerEnvVar';

export class AuthPageController {
    static login() {
        return async (
            ctx: ParameterizedContext<
                any,
                Router.IRouterParamContext<any, {}>
            >,
            next: () => any
        ) => {
            let token = AuthUtil.getToken(ctx, ServerEnvVar.TokenKey);

            if (typeof token == "undefined") {
                await next();
                return;
            }

            const verify = AuthUserRepository.verify(token, ServerEnvVar.JwtSecret);

            if (!verify) {
                await next();
                return;
            }

            ctx.status = 200;
            ctx.redirect("/admin");
        };
    }

    static logout() {
        return async (
            ctx: ParameterizedContext<any, IRouterParamContext<any, {}>
            >,
            next: any
        ) => {
            let token = AuthUtil.getToken(ctx, ServerEnvVar.TokenKey);

            if (typeof token == "undefined") {
                ctx.status = 200;
                ctx.cookies.set(ServerEnvVar.TokenKey, "", { maxAge: -1 });
                ctx.redirect("/login");
                return;
            }

            const verify = AuthUserRepository.verify(token, ServerEnvVar.JwtSecret);

            if (verify) {
                AuthUserRepository.logout(token, ServerEnvVar.JwtSecret);
            }

            ctx.status = 200;
            ctx.cookies.set(ServerEnvVar.TokenKey, "", { maxAge: -1 });
            ctx.redirect("/login");

        };
    }
}
