import Koa from 'koa';
import KoaBearerToken from 'koa-bearer-token';
import KoaBody from 'koa-body';

export default class KoaServer {
  constructor(props?: {}) { }

  getInstance() {
    const server = new Koa();

    server.use(KoaBody());
    server.use(KoaBearerToken());

    return server;
  }
}
