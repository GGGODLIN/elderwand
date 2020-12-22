import dotenv from 'dotenv';
import KoaServer from './server';
import NextJS from 'next';
import { AuthMiddleware } from 'g13-web-shared/server/user/middlewares/AuthMiddleware';
import { AuthRouter } from './routers/AuthRouter';
import { ServerEnvVar } from './config/ServerEnvVar';
import { UserRouter } from './routers/UserRouter';
import { RouterMiddleware } from 'g13-web-shared/server/shared/middlewares';

const dotenv_path = process.env.NODE_ENV ? `./.env.${process.env.NODE_ENV}` : `./.env`;
const env = dotenv.config({ path: dotenv_path }).parsed;

const app = NextJS({ dev: ServerEnvVar.IsDev });
const handle = app.getRequestHandler();

const whitelist: RegExp[] = [
  /^\/$/, // index
  /^\/_next\/static/,
  /^\/login/,
  /^\/logout/,
  /^\/api\/login/,
  /^\/api\/logout/,
];

if (ServerEnvVar.IsDev) {
  whitelist.push(/^\/_next\/webpack-hmr/);
}

app.prepare().then(() => {

  const server = new KoaServer()
    .use([
      RouterMiddleware.handleApiRouter(),
      AuthMiddleware(ServerEnvVar.TokenKey, ServerEnvVar.JwtSecret, whitelist),
      AuthRouter.getRouters(),
      UserRouter.getRouters(),
      RouterMiddleware.handlePageRouter(handle)
    ]).getInstance();

  const host = ServerEnvVar.Host;
  const port = ServerEnvVar.Port;

  server.listen(port, host, () => {
    console.log("\n=== Start Server ===");
    console.log(`=== ${host}:${port} ===`);
    console.log(JSON.stringify({
      PATH: dotenv_path, ...env
    }, undefined, 2))
    console.log(JSON.stringify(ServerEnvVar, undefined, 2));
    console.log("====================\n");
  });

});
