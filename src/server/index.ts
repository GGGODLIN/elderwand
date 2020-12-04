import dotenv from 'dotenv';
import KoaServer from './server';
import NextJS from 'next';
import { Context } from 'vm';
import { EnvVar } from './config/EnvVar';

const dotenv_path = process.env.NODE_ENV ? `./.env.${process.env.NODE_ENV}` : `./.env`;
const env = dotenv.config({ path: dotenv_path }).parsed;

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

  const host = EnvVar.Host;
  const port = EnvVar.Port;

  server.listen(port, host, () => {
    console.log("\n=== Start Server ===");
    console.log(`=== ${host}:${port} ===`);
    console.log(JSON.stringify({
      PATH: dotenv_path, ...env
    }, undefined, 2))
    console.log(JSON.stringify(EnvVar, undefined, 2));
    console.log("====================\n");
  });

});
