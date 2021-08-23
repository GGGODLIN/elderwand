import supertest from 'supertest';
import PaginationVM from '../../../client/models/PaginationVM';
import TestEnvVar from '../../../test/config/TestEnvVar';
import ServerEnvVar from '../../config/ServerEnvVar';
import AuthWhitelist from '../../config/Whitelist';
import ErrorInfoDTO from '../../domain/shared/models/ErrorInfoDTO';
import AuthorizeMiddleware from '../../middlewares/AuthMiddleware';
import DeviceVM from '../../models/migration/DeviceVM';
import {
    DeviceTemplatePreviewVM,
    ProjectPreviewVM,
} from '../../models/migration/PreviewVMs';
import ProjectVM from '../../models/migration/ProjectVM';
import SpaceVM from '../../models/migration/SpaceVM';
import KoaServer from '../../server';
import MigrationRouter, { MigrationRouterActions } from '../MigrationRouter';

describe('Migration Router', () => {
    let server: supertest.SuperTest<supertest.Test>;

    beforeAll(() => {
        server = supertest(
            new KoaServer()
                // .use([
                //     AuthorizeMiddleware.getAuthorizeRouterHandler(
                //         ServerEnvVar.TokenKey,
                //         ServerEnvVar.JwtSecret,
                //         AuthWhitelist
                //     ),
                // ])
                .use([MigrationRouter.getApiRouter()])
                .getInstance()
                .callback()
        );
    });

    afterAll(() => {});

    describe('list source projects', () => {
        it('should be 400', async function () {
            const pathname = MigrationRouterActions.listProjects();

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .expect(400);

            const actual = response.body as ErrorInfoDTO;

            console.log(actual);
        });

        it('should be 200', async function () {
            const pathname = MigrationRouterActions.listProjects();

            const query = {
                dbname: TestEnvVar.MigrationMongodbSake,
                conn: TestEnvVar.MigrationSourceMongodbUri,
                version: 200,
            };

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body as PaginationVM<ProjectPreviewVM>;

            console.log(actual);
        });
    });

    describe('get the source project', () => {
        it('should be 200', async function () {
            const code = TestEnvVar.MigrationTargetProjectCode;

            const pathname = MigrationRouterActions.getProject(code);

            const query = {
                dbname: TestEnvVar.MigrationMongodbSake,
                conn: TestEnvVar.MigrationSourceMongodbUri,
                version: 200,
            };

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body as ProjectPreviewVM;

            console.log(actual);
        });
    });

    describe('list source spaces by project', function () {
        it('should be successful', async function () {
            const code = TestEnvVar.MigrationTargetProjectCode;

            const pathname = MigrationRouterActions.listSpaces(code);

            const query = {
                dbname: TestEnvVar.MigrationMongodbSake,
                conn: TestEnvVar.MigrationSourceMongodbUri,
                version: 200,
            };

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body as PaginationVM<ProjectPreviewVM>;

            console.log(actual);
        });
    });

    describe('list source device by project', function () {
        it('should be successful', async function () {
            const code = TestEnvVar.MigrationTargetProjectCode;

            const pathname = MigrationRouterActions.listDevices(code);

            const query = {
                dbname: TestEnvVar.MigrationMongodbSake,
                conn: TestEnvVar.MigrationSourceMongodbUri,
                version: 200,
            };

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body as PaginationVM<ProjectPreviewVM>;

            console.log(actual);
        });
    });

    describe('list source device templates', function () {
        it('should be successful', async function () {
            const pathname = MigrationRouterActions.listDeviceTemplates();

            const query = {
                dbname: TestEnvVar.MigrationMongodbThings,
                conn: TestEnvVar.MigrationSourceMongodbUri,
                version: 200,
            };

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual =
                response.body as PaginationVM<DeviceTemplatePreviewVM>;

            console.log(actual);
        });
    });

    describe('import project', function () {
        it('should be successful', async function () {
            const code = TestEnvVar.MigrationTargetProjectCode;

            const pathname = MigrationRouterActions.importProject(code);

            const query = {
                dbname: TestEnvVar.MigrationMongodbSake,
                conn: TestEnvVar.MigrationSourceMongodbUri,
                version: 200,
            };

            const body = {
                // todo from generate api
                code: TestEnvVar.NewTargetProjectCode,
            };

            const response = await server
                .post(pathname)
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .send(body)
                .expect(201);

            const actual = response.body as ProjectVM;

            console.log(actual);
        });
    });

    describe('import spaces with project', function () {
        it(
            'should be successful',
            async function () {
                const code = TestEnvVar.MigrationTargetProjectCode;

                const pathname = MigrationRouterActions.importSpaces(code);

                const query = {
                    dbname: TestEnvVar.MigrationMongodbSake,
                    conn: TestEnvVar.MigrationSourceMongodbUri,
                    version: 200,
                };

                const body = {
                    // todo from generate api
                    code: TestEnvVar.NewTargetProjectCode,
                };

                const response = await server
                    .post(pathname)
                    // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                    .set('Accept', 'application/json')
                    .query(query)
                    .send(body)
                    .expect(201);

                const actual = response.body as PaginationVM<SpaceVM>;

                console.log(actual);
            },
            10 * 60 * 1000
        );
    });

    describe('import space templates', function () {
        it(
            'should be successful',
            async function () {
                const code = TestEnvVar.MigrationTargetProjectCode;

                const pathname = MigrationRouterActions.importSpaceTemplates();

                const query = {
                    dbname: TestEnvVar.MigrationMongodbSake,
                    conn: TestEnvVar.MigrationSourceMongodbUri,
                    version: 200,
                };

                const body = {
                    // todo from generate api
                    code: TestEnvVar.NewTargetProjectCode,
                };

                const response = await server
                    .post(pathname)
                    // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                    .set('Accept', 'application/json')
                    .query(query)
                    .send(body)
                    .expect(201);

                const actual = response.body as PaginationVM<SpaceVM>;

                console.log(actual);
            },
            10 * 60 * 1000
        );
    });

    describe('import devices with project', function () {
        it(
            'should be successful',
            async function () {
                const code = TestEnvVar.MigrationTargetProjectCode;

                const pathname = MigrationRouterActions.importDevices(code);

                const query = {
                    dbname: TestEnvVar.MigrationMongodbSake,
                    conn: TestEnvVar.MigrationSourceMongodbUri,
                    version: 200,
                };

                const body = {
                    // todo from generate api
                    code: TestEnvVar.NewTargetProjectCode,
                };

                const response = await server
                    .post(pathname)
                    // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                    .set('Accept', 'application/json')
                    .set('Content-Type', 'application/json')
                    .query(query)
                    .send(body)
                    .expect(201);

                const actual = response.body as PaginationVM<DeviceVM>;

                console.log(actual);
            },
            10 * 60 * 1000
        );
    });

    describe('import device templates ', function () {
        it('should be successful', async function () {
            const pathname = MigrationRouterActions.importDeviceTemplates();

            const query = {
                dbname: TestEnvVar.MigrationMongodbThings,
                conn: TestEnvVar.MigrationSourceMongodbUri,
                version: 200,
            };

            const response = await server
                .post(pathname)
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .query(query)
                .expect(201);

            const actual = response.body as PaginationVM<DeviceVM>;

            console.log(actual);
        });
    });
});

export {};
