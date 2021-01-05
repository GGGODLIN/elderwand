import compose from 'koa-compose';
import Router from 'koa-router';
import ProjectMaintainUCO from '../application/ProjectMaintainUCO';
import { ParameterizedContext } from 'koa';
import { AuthUtil } from 'g13-web-shared/server/user';
import { ServerEnvVar } from '../config/ServerEnvVar';

export class ProjectApiController {
    static create(): compose.Middleware<
        ParameterizedContext<any, Router.IRouterParamContext<any, {}>>> {

        return async (ctx) => {

            const token = AuthUtil.getToken(ctx, ServerEnvVar.TokenKey);
            const jwt = AuthUtil.decode(token, ServerEnvVar.JwtSecret);
            const uid = jwt.data.id

            const code = await new ProjectMaintainUCO()
                .generateProjectCode({})
                .then((result) => {
                    return result.code
                }).catch((err) => {
                    ctx.status = 400;
                    ctx.body = err;
                    return ""
                });

            if (!code) {
                return;
            }

            const body = ctx.request["body"]
            const vo = {
                ...body,
                owner_id: uid,
                code: code
            }

            console.log(vo);

            await new ProjectMaintainUCO()
                .create(vo)
                .then((result) => {
                    ctx.status = 200;
                    ctx.body = result

                }).catch((err) => {
                    ctx.status = 400;
                    ctx.body = err;
                });
        }
    }

    static get(): compose.Middleware<
        ParameterizedContext<any, Router.IRouterParamContext<any, {}>>> {

        return async (ctx) => {

            const { pid, code } = ctx.params
            const vo = {
                pid, code
            }

            await new ProjectMaintainUCO().get(pid)
                .then((result) => {
                    ctx.status = 200;
                    ctx.body = result

                }).catch((err) => {
                    ctx.status = 400;
                    ctx.body = err;
                });
        }
    }

    static generateProjectCode(): compose.Middleware<
        ParameterizedContext<any, Router.IRouterParamContext<any, {}>>> {

        return async (ctx) => {

            await new ProjectMaintainUCO().generateProjectCode({})
                .then((result) => {
                    ctx.status = 200;
                    ctx.body = result

                }).catch((err) => {
                    ctx.status = 400;
                    ctx.body = err;
                });
        }
    }

    static query(): compose.Middleware<
        ParameterizedContext<any, Router.IRouterParamContext<any, {}>>> {
        return async (ctx) => {

            const vo = {
                ...ctx.query
            }

            await new ProjectMaintainUCO().query(vo)
                .then((result) => {
                    ctx.status = 200;
                    ctx.body = result

                }).catch((err) => {
                    ctx.status = 400;
                    ctx.body = err;
                });
        }
    }

}
