import { Context } from 'koa';
import { ServerEnvVar } from '../config/ServerEnvVar';
import RequestBody from '../domain/shared/types/RequestBody';

export default class DevelopmentMiddleware {
    static displayRequestBody = async (
        ctx: Context & RequestBody<any>,
        next
    ) => {
        if (ServerEnvVar.IsDev) {
            console.log(ctx.request.body);
        }

        await next();
    };
}
