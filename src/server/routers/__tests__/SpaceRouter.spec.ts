import supertest from 'supertest';
import PaginationVM from '../../../client/models/PaginationVM';
import TestEnvVar from '../../../test/config/TestEnvVar';
import SpaceVM from '../../models/space/SpaceVM';
import KoaServer from '../../server';
import SpaceRouter, { SpaceRouterActions } from '../SpaceRouter';

describe('Space Router', function () {
    let server: supertest.SuperTest<supertest.Test>;

    beforeAll(() => {
        server = supertest(
            new KoaServer()
                .use([SpaceRouter.getApiRouter()])
                .getInstance()
                .callback()
        );
    });

    afterAll(() => {});

    describe('list spaces', function () {
        it('should be 200', async function () {
            const pathname = SpaceRouterActions.listSpaces();

            const query = {
                projectID: TestEnvVar.NewTargetProjectCode,
            };

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body as PaginationVM<SpaceVM>;

            console.log(actual);
        });
    });

    describe('get the space', function () {
        it('should be 200', async function () {
            // TODO variable
            const id = '37549d52-c84f-4c04-ac7b-d1632e6c490b';

            const pathname = SpaceRouterActions.getSpace(id);

            const query = {
                projectID: TestEnvVar.NewTargetProjectCode,
            };

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body as SpaceVM;

            console.log(actual);
        });
    });
});
