import dotenv from 'dotenv';
import KoaServer from './server';
import NextJS from 'next';
import { AuthMiddleware } from 'g13-web-shared/server/user/middlewares/AuthMiddleware';
import { AuthRouter } from './routers/AuthRouter';
import { AuthWhitelist } from './config/Whitelist';
import { ProjectRouter } from './routers/ProjectRouter';
import { RouterMiddleware } from 'g13-web-shared/server/shared/middlewares';
import { ServerEnvVar } from './config/ServerEnvVar';
import { UserRouter } from './routers/UserRouter';

const dotenv_path = process.env.NODE_ENV ? `./.env.${process.env.NODE_ENV}` : `./.env`;
const env = dotenv.config({ path: dotenv_path }).parsed;

const app = NextJS({ dev: ServerEnvVar.IsDev });
const handle = app.getRequestHandler();

if (ServerEnvVar.IsDev) {
  AuthWhitelist.push(/^\/_next\/webpack-hmr/);
}

app.prepare().then(() => {

  const server = new KoaServer()
    .use([
      RouterMiddleware.handleApiRouter(),
      AuthMiddleware(ServerEnvVar.TokenKey, ServerEnvVar.JwtSecret, AuthWhitelist),
      AuthRouter.getRouters(),
      UserRouter.getRouters(),
      ProjectRouter.getRouters(),
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
