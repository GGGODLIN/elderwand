import Koa from 'koa';
import compose from 'koa-compose';
import KoaRouter from 'koa-router';

type RouterMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface KoaRouterFactoryOptions {
    [key: string]: {
        name?: string;
        action: string;
        method: RouterMethod;
        middleware?: Koa.Middleware<any>;
        controller: Koa.Middleware<any>;
    };
}
export default class KoaRouterFactory {
    static create(prefix: string, options: KoaRouterFactoryOptions) {
        const router = new KoaRouter().prefix(prefix);

        const keys = Object.keys(options);

        for (const key of keys) {
            const option = options[key];

            const method = option.method || 'GET';

            const name = option.name || `${prefix}-${key}`;
            const path = option.action || '';
            const handler = option.controller;
            const middleware =
                option.middleware ||
                (async (ctx, next) => {
                    await next();
                });

            switch (method) {
                case 'GET':
                    router.get(name, path, middleware, handler);
                    break;
                case 'POST':
                    router.post(name, path, middleware, handler);
                    break;
                case 'PUT':
                    router.put(name, path, middleware, handler);
                    break;
                case 'DELETE':
                    router.delete(name, path, middleware, handler);
                    break;
                default:
                    break;
            }
        }

        console.log(router.stack.map((layer) => layer.path));

        return compose([router.allowedMethods(), router.routes()]);
    }
}
