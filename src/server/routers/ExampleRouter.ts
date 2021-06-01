import compose from 'koa-compose';
import KoaRouter from 'koa-router';
import KoaRouterFactory, {
    KoaRouterFactoryOptions,
} from '../helpers/KoaRouterFactory';

export default class ExampleRouter {
    static getApiRouter(isDev: boolean) {
        if (!isDev) {
            return [] as any;
        }

        const before = async (ctx, next) => {
            console.log('before controller');
            await next();
        };

        const after = async (ctx, next) => {
            await next();
            console.log('after controller');
        };

        const handle: KoaRouter.IMiddleware<any> = async (ctx, next) => {
            ctx.status = 200;
            ctx.body = {
                status: ctx.status,
                message: ctx.message,
            };
            console.log(ctx.body);
        };

        const middlewares = compose([before, after]);

        const options: KoaRouterFactoryOptions = {
            me: {
                name: 'api-get-example',
                action: '/example',
                method: 'GET',
                middleware: middlewares,
                controller: handle,
            },
        };

        return KoaRouterFactory.create('/api', options);
    }
}
