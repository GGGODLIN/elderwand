import PaginationVM from 'src/server/models/PaginationVM';
import supertest from 'supertest';
import TestEnvVar from '../../../test/config/TestEnvVar';
import TestUtil from '../../../test/utils/TestUtil';
import ServerEnvVar from '../../config/ServerEnvVar';
import AuthWhitelist from '../../config/Whitelist';
import AuthorizeMiddleware from '../../middlewares/AuthMiddleware';
import SpaceVM, {
    SpaceTemplateVM,
    SpaceTopology,
} from '../../models/space/SpaceVM';
import KoaServer from '../../server';
import AuthUtil from '../../utils/AuthUtil';
import AuthRouter from '../AuthRouter';
import SpaceRouter, { SpaceRouterActions } from '../SpaceRouter';

describe('Space Router', function () {
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
                .use([AuthRouter.getApiRouter(), SpaceRouter.getApiRouter()])
                .getInstance()
                .callback()
        );
        token = await TestUtil.getToken(server);
    });

    afterAll(() => {});

    describe('list spaces', function () {
        it('should be 200', async function () {
            const pathname = SpaceRouterActions.listSpaces();

            const query = {
                projectId: TestEnvVar.NewTargetProjectCode,
            };

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body as PaginationVM<SpaceVM>;

            console.log(actual);
        });
    });

    async function getSpaces(): Promise<SpaceVM[]> {
        const pathname = SpaceRouterActions.listSpaces();

        const query = {
            projectId: TestEnvVar.NewTargetProjectCode,
        };

        const response = await server
            .get(pathname)
            .set('Accept', 'application/json')
            .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
            .query(query)
            .expect(200);

        const pvm = response.body as PaginationVM<SpaceVM>;

        return pvm.results;
    }

    describe('get the space', function () {
        it('should be 200', async function () {
            const spaces = await getSpaces();

            const id = spaces[0].id;

            const pathname = SpaceRouterActions.getSpace(id);

            const query = {
                projectId: TestEnvVar.NewTargetProjectCode,
            };

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body as SpaceVM;

            console.log(actual);
        });
    });

    describe('get the space topology', function () {
        it('should be 200', async function () {
            const spaces = await getSpaces();

            const space = spaces.find((space) => !space.parentId);

            const id = space.id;

            const pathname = SpaceRouterActions.getSpaceTopology(id);

            const query = {
                projectId: TestEnvVar.NewTargetProjectCode,
            };

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body as SpaceTopology;

            console.log(actual);
        });
    });

    describe('list space templates', function () {
        it('should be 200', async function () {
            const pathname = SpaceRouterActions.listSpaceTemplates();

            const query = {};

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body as PaginationVM<SpaceTemplateVM>;

            console.log(actual);
        });
    });
});
