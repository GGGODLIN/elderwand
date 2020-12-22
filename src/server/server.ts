import Koa, { ParameterizedContext } from 'koa';
import KoaBearerToken from 'koa-bearer-token';
import KoaBody from 'koa-body';
import Router, { IRouterParamContext } from 'koa-router';
import { Middleware } from 'koa-compose';

export default class KoaServer {

  private server: Koa<Koa.DefaultState, Koa.DefaultContext>;
  private middlewares: Koa.Middleware<{}, {}>[] = []
  private routers: Middleware<
    Koa.ParameterizedContext<any, Router.IRouterParamContext<{}, {}>>>[] = [];

  constructor() {
    this.server = new Koa();
    this.use([
      KoaBody(),
      KoaBearerToken(),
    ])
  }

  use(middlewares:
    Middleware<ParameterizedContext<any, IRouterParamContext<any, {}>>> |
    Middleware<ParameterizedContext<{}, {}>> |
    Middleware<ParameterizedContext<{}, {}>>[] |
    Middleware<ParameterizedContext<any, IRouterParamContext<any, {}>>> |
    Middleware<ParameterizedContext<any, IRouterParamContext<any, {}>>>[]) {

    if (Array.isArray(middlewares)) {
      middlewares.forEach((mw: Middleware<any>) => {
        this.server.use(mw);
      });
      return this;
    }

    this.server.use(middlewares as any);

    return this;
  }

  getInstance(): Koa<Koa.DefaultState, Koa.DefaultContext> {

    this.middlewares.forEach((mw: Middleware<Koa.
      ParameterizedContext<{}, {}>>) => {
      this.server.use(mw);
    });

    this.routers.forEach(router => {
      this.server.use(router);
    });

    return this.server;
  }

}
