import compose from 'koa-compose';
import KoaServer from '../../server';
import Router from 'koa-router';
import supertest from 'supertest';

const TEST_PORT = 3030;
const TEST_HOST = '0.0.0.0';

describe('Authorize Admin Page', () => {
    const router = new Router();

    router.get('/admin', async (ctx, next) => {
        next();
        ctx.status = 401;
    });

    const routers = compose([router.routes(), router.allowedMethods()]);

    const server = new KoaServer().getInstance().use(routers).listen(TEST_PORT, TEST_HOST);

    module.exports = server;

    afterAll(() => {
        server.close();
    });

    describe('GET /admin Page', () => {
        test('should get 401 status code', async () => {
            const agent = supertest.agent(server);

            const result = await agent.get('/admin').expect(401);

            console.log(result.status);
        });
    });
});
