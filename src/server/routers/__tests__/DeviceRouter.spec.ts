import supertest from 'supertest';
import PaginationVM from '../../../client/models/PaginationVM';
import TestEnvVar from '../../../test/config/TestEnvVar';
import DeviceVM from '../../models/device/DeviceVM';
import KoaServer from '../../server';
import DeviceRouter, {
    DeviceRouterActions,
    DeviceVersion2RouterActions,
} from '../DeviceRouter';

describe('Device Router', function () {
    let server: supertest.SuperTest<supertest.Test>;

    beforeAll(() => {
        server = supertest(
            new KoaServer()
                .use([
                    DeviceRouter.getApiRouter(),
                    DeviceRouter.getApiRouterVersion2(),
                ])
                .getInstance()
                .callback()
        );
    });

    afterAll(() => {});

    describe('list devices', function () {
        it('should be 200', async function () {
            const pathname = DeviceRouterActions.listDevices();

            const query = {
                projectID: TestEnvVar.NewTargetProjectCode,
            };

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body as PaginationVM<DeviceVM>;

            console.log(actual);
        });
    });

    describe('get the device', function () {
        it('should be 200', async function () {
            const id = 'REXX-Lv1FvqAIKUsn';

            const pathname = DeviceRouterActions.getDevice(id);

            const query = {
                projectID: TestEnvVar.NewTargetProjectCode,
            };

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body as DeviceVM;

            console.log(actual);
        });
    });

    describe('bind the gateway connection to the device', function () {
        it('should be 200', async function () {
            // TODO variable
            const id = 'REXX-Lv1FvqAIKUsn';

            const pathname = DeviceRouterActions.bindGatewayConnection(id);

            const query = {
                projectID: TestEnvVar.NewTargetProjectCode,
            };

            const body = {
                cid: TestEnvVar.GatewayConnectionID,
            };

            const response = await server
                .put(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .send(body)
                .expect(200);

            const actual = response.body as DeviceVM;

            console.log(actual);
        });
    });

    describe('get the device data repository', function () {
        it('should be 200', async function () {
            // TODO variable
            const id = 'REXX-1608yjZgQOG0';

            const pathname = DeviceRouterActions.getRepository(id);

            const query = {
                projectID: TestEnvVar.NewTargetProjectCode,
            };

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body;

            console.log(actual);
        });
    });

    describe('get the version 2 device data repository', function () {
        it('should be 200', async function () {
            // TODO variable
            const id = 'REXX-1608yjZgQOG0';

            const pathname = DeviceVersion2RouterActions.getRepository(id);

            const query = {
                projectID: TestEnvVar.NewTargetProjectCode,
            };

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body;

            console.log(actual);
        });
    });
});
