import supertest from 'supertest';
import PaginationVM from '../../../client/models/PaginationVM';
import TestEnvVar from '../../../test/config/TestEnvVar';
import DeviceVM from '../../models/device/DeviceVM';
import DeviceTemplateVM from '../../models/migration/DeviceTemplateVM';
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
                projectId: TestEnvVar.NewTargetProjectCode,
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
            const id = 'REXX-d81fQON92xiu';

            const pathname = DeviceRouterActions.getDevice(id);

            const query = {
                projectId: TestEnvVar.NewTargetProjectCode,
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
            const id = 'REXX-d81fQON92xiu';

            const pathname = DeviceRouterActions.bindGatewayConnection(id);

            const query = {
                projectId: TestEnvVar.NewTargetProjectCode,
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

    describe('unbind the gateway connection to the device', function () {
        it('should be 200', async function () {
            // TODO variable
            const id = 'REXX-d81fQON92xiu';

            const pathname = DeviceRouterActions.unbindGatewayConnection(id);

            const query = {
                projectId: TestEnvVar.NewTargetProjectCode,
            };

            const response = await server
                .delete(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body as DeviceVM;

            console.log(actual);
        });
    });

    describe('get the device data repository', function () {
        it('should be 200', async function () {
            // TODO variable
            const id = 'REXX-d81fQON92xiu';

            const pathname = DeviceRouterActions.getRepository(id);

            const query = {
                projectId: TestEnvVar.NewTargetProjectCode,
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
            const id = 'REXX-r39wgkzaCtcP';

            const pathname = DeviceVersion2RouterActions.getRepository(id);

            const query = {
                projectId: TestEnvVar.NewTargetProjectCode,
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

    describe('list device templates', function () {
        it('should be 200', async function () {
            const pathname = DeviceRouterActions.listDeviceTemplates();

            const query = {};

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body as PaginationVM<DeviceTemplateVM>;

            console.log(actual);
        });
    });

    describe('list device topology resource', function () {
        it('should be 200', async function () {
            const pathname = DeviceRouterActions.listDeviceTemplates();

            const query = {};

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .query(query)
                .expect(200);

            const actual = response.body as PaginationVM<DeviceTemplateVM>;

            console.log(actual);
        });
    });
});
