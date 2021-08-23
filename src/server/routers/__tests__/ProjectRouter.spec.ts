import supertest from 'supertest';
import PaginationVM from '../../../client/models/PaginationVM';
import TestEnvVar from '../../../test/config/TestEnvVar';
import ProjectVM from '../../models/project/ProjectVM';
import KoaServer from '../../server';
import ProjectRouter, { ProjectRouterActions } from '../ProjectRouter';

describe('Project Router', function () {
    let server: supertest.SuperTest<supertest.Test>;

    beforeAll(() => {
        server = supertest(
            new KoaServer()
                .use([ProjectRouter.getApiRouter()])
                .getInstance()
                .callback()
        );
    });
    afterAll(() => {});

    describe('list projects', function () {
        it('should be 200', async function () {
            const pathname = ProjectRouterActions.listProjects();

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                // .query(query)
                .expect(200);

            const actual = response.body as PaginationVM<ProjectVM>;

            console.log(actual);
        });
    });

    describe('get the project', function () {
        it('should be 200', async function () {
            const code = TestEnvVar.NewTargetProjectCode;
            const pathname = ProjectRouterActions.getProject(code);

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                // .query(query)
                .expect(200);

            const actual = response.body as ProjectVM;

            console.log(actual);
        });
    });
});

export {};
