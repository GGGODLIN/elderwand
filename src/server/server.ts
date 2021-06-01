import * as Application from 'koa';
import Koa from 'koa';
import KoaBearerToken from 'koa-bearer-token';
import KoaBodyParser from 'koa-bodyparser';
import KoaLogger from 'koa-logger';
import Router from 'koa-router';

export default class KoaServer {
    private readonly server: Application<
        Application.DefaultState,
        Application.DefaultContext
    >;

    constructor() {
        this.server = new Koa();

        this.use([
            KoaBodyParser(),
            KoaBearerToken({
                // bodyKey: "access_token",
                // queryKey: "access_token",
                // headerKey: "Bearer",
                // reqKey: "token",
            }),
            KoaLogger(),
        ]);
    }

    use(
        middlewares: ((
            context: Application.ExtendableContext & {
                state: any;
            } & Router.IRouterParamContext<any, {}> & {
                    body: any;
                    request: { body: any };
                    response: { body: any };
                },
            next?: Application.Next
        ) => Promise<void>)[]
    ) {
        if (middlewares == null) {
            return this;
        }

        if (Array.isArray(middlewares)) {
            middlewares.forEach((mw) => {
                this.server.use(mw);
            });
            return this;
        }
        this.server.use(middlewares);
        return this;
    }

    getInstance(): Koa<Koa.DefaultState, Koa.DefaultContext> {
        return this.server;
    }
}
