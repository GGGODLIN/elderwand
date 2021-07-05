import supertest from 'supertest';
import TestEnvVar from '../../../test/config/TestEnvVar';
import TestUtil from '../../../test/utils/TestUtil';
import ServerEnvVar from '../../config/ServerEnvVar';
import AuthWhitelist from '../../config/Whitelist';
import AuthorizeMiddleware from '../../middlewares/AuthMiddleware';
import UserVM from '../../models/user/UserVM';
import KoaServer from '../../server';
import AuthUtil from '../../utils/AuthUtil';
import AuthRouter, { AuthApiRouterActions } from '../AuthRouter';
import UserRouter, { UserRouterActions } from '../UserRouter';

describe('Auth Router', function () {
    let server: supertest.SuperTest<supertest.Test>;
    let token: string;

    beforeAll(async () => {
        server = supertest(
            new KoaServer()
                .use([
                    AuthorizeMiddleware.getAuthorizeRouterHandler(
                        ServerEnvVar.TokenKey,
                        ServerEnvVar.JwtSecret,
                        AuthWhitelist
                    ),
                ])
                .use([AuthRouter.getApiRouter(), UserRouter.getApiRouter()])
                .getInstance()
                .callback()
        );
        token = await TestUtil.getToken(server);
    });

    afterAll(() => {});

    describe('user login', function () {
        it('should be 200', async function () {
            const pathname = AuthApiRouterActions.login();

            const body = {
                username: TestEnvVar.SkymapAdminAccount,
                password: TestEnvVar.SkymapAdminPassword,
            };

            const response = await server
                .post(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                // .query(query)
                .send(body)
                .expect(200);

            const actual = response.body as UserVM;

            console.log(actual);
        });
    });

    describe('get user ', function () {
        it('should be 200', async function () {
            const pathname = UserRouterActions.me();

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                // .query(query)
                .expect(200);

            const actual = response.body as UserVM;

            console.log(actual);
        });
    });
});

export {};
