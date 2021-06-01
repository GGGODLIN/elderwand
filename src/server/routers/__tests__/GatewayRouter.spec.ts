import supertest from 'supertest';
import PaginationVM from '../../../client/models/PaginationVM';
import TestEnvVar from '../../../test/config/TestEnvVar';
import TestDataGenerator from '../../../test/utils/TestDataGenerator';
import GatewayConnectionVM from '../../models/gateway/GatewayConnectionVM';
import KoaServer from '../../server';
import GatewayRouter, { GatewayRouterActions } from '../GatewayRouter';

describe('Gateway Router', function () {
    let server: supertest.SuperTest<supertest.Test>;

    beforeAll(() => {
        server = supertest(
            new KoaServer()
                .use([GatewayRouter.getApiRouter()])
                .getInstance()
                .callback()
        );
    });

    afterAll(() => {});

    describe('gateway connect', function () {
        it('should be 200', async function () {
            const pathname = GatewayRouterActions.connect();

            const ip = TestEnvVar.GatewayClientIP;

            const body = TestDataGenerator.newGatewayConnectVO({ ip: ip });

            const response = await server
                .put(pathname)
                .set('Remote-Addr', ip)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                // .query(query)
                .send(body)
                .expect(200);

            const actual = response.body as GatewayConnectionVM;

            console.log(actual);
        });
    });

    describe('list gateway connections', function () {
        it('should be 200', async function () {
            const pathname = GatewayRouterActions.listGateways();

            const ip = TestEnvVar.GatewayClientIP;

            const response = await server
                .get(pathname)
                .set('Remote-Addr', ip)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                // .query(query)
                .expect(200);

            const actual = response.body as PaginationVM<GatewayConnectionVM>;

            console.log(actual);
        });
    });
});
