import { Context } from 'koa';
import ServerEnvVar from '../config/ServerEnvVar';
import RequestBody from '../domain/shared/types/RequestBody';

export default class DevelopmentMiddleware {
    static getDisplayBodyHandler = () => {
        return async (ctx: Context & RequestBody<any>, next) => {
            await next();

            if (
                ServerEnvVar.IsDev &&
                ctx.state.isApi &&
                ctx.request.method != 'GET'
            ) {
                console.log(ctx.request.body);
            }
        };
    };
}
