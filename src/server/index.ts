import compose from 'koa-compose';
import NextJS from 'next';
import { Context } from 'vm';
import KoaServer from './server';
/// <reference types="../@types/koa-bearer-token" />

const app = NextJS({ dev: true });
const handle = app.getRequestHandler();

const server = new KoaServer().getInstance();

app.prepare().then(() => {

  server.use(async (ctx: Context, next) => {
    if (ctx.state.isApi) {
      return;
    }

    await handle(ctx.req, ctx.res);
    ctx.response = false;
  });

  const host = "0.0.0.0";
  const port = 3000;

  server.listen(port, host, () => {
    console.log("\n=== start server ===");
    console.log(`=== ${host}:${port} ===`);
    // console.log(process.env)
    console.log("====================\n");
  });

});
