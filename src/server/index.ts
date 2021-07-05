import NextJS from 'next';
import ServerEnvVar from './config/ServerEnvVar';
import AuthWhitelist from './config/Whitelist';
import AuthorizeMiddleware from './middlewares/AuthMiddleware';
import DevelopmentMiddleware from './middlewares/DevelopmentMiddleware';
import RouterHandleMiddleware from './middlewares/RouterHandleMiddleware';
import AuthRouter from './routers/AuthRouter';
import DeviceRouter from './routers/DeviceRouter';
import ExampleRouter from './routers/ExampleRouter';
import GatewayRouter from './routers/GatewayRouter';
import MigrationRouter from './routers/MigrationRouter';
import NextJsRouter from './routers/NextJsRouter';
import ProjectRouter from './routers/ProjectRouter';
import RootRouter from './routers/RootRouter';
import SpaceRouter from './routers/SpaceRouter';
import UserRouter from './routers/UserRouter';
import KoaServer from './server';

const app = NextJS({ dev: ServerEnvVar.IsDev });
const handle = app.getRequestHandler();

if (ServerEnvVar.IsDev) {
    AuthWhitelist.push(/^\/_next\/webpack-hmr/);
}

app.prepare().then(() => {
    const server = new KoaServer()
        .use([
            RouterHandleMiddleware.getApiRouterHandler(),
            DevelopmentMiddleware.getDisplayBodyHandler(),
            AuthorizeMiddleware.getAuthorizeRouterHandler(
                ServerEnvVar.TokenKey,
                ServerEnvVar.JwtSecret,
                AuthWhitelist
            ),
        ])
        .use(ExampleRouter.getApiRouter(ServerEnvVar.IsDev))
        .use([
            AuthRouter.getApiRouter(),
            MigrationRouter.getApiRouter(),
            RootRouter.getApiRouter(),
            UserRouter.getApiRouter(),
            ProjectRouter.getApiRouter(),
            GatewayRouter.getApiRouter(),
            SpaceRouter.getApiRouter(),
            DeviceRouter.getApiRouter(),
            DeviceRouter.getApiRouterVersion2(),
        ])
        .use([AuthRouter.getPageRouter(), NextJsRouter.getPageRouter(handle)])
        .getInstance();

    const host = ServerEnvVar.Host;
    const port = ServerEnvVar.Port;

    server.listen(port, host, () => {
        console.log('\n=== Start Server ===');
        console.log(`=== ${host}:${port} ===`);
        console.log(JSON.stringify(ServerEnvVar, undefined, 2));
        console.log('====================\n');
    });
});
