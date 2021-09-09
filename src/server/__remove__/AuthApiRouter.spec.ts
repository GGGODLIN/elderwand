// import compose from 'koa-compose';
// import KoaServer from '../server';
// import Router from 'koa-router';
// import supertest from 'supertest';
// import TestEnvVar from '../../test/config/TestEnvVar';
// import { AuthRouter } from '../routers/AuthRouter';
// import { AuthUtil } from 'g13-web-shared/server/user';
// import ServerEnvVar from '../config/ServerEnvVar';
// import { UserDTO } from 'g13-web-shared/server/user/models';
// import { v4 as uuidv4 } from 'uuid';
//
// describe('Verify JWT token', () => {
//     test('should be successful', async () => {
//         const payload = {
//             id: uuidv4(),
//             username: 'test user',
//         };
//
//         const secret = ServerEnvVar.JwtSecret;
//
//         const token = AuthUtil.sign(payload, secret);
//
//         const verified = AuthUtil.verify(token, secret);
//
//         expect(verified).toBeTruthy();
//
//         const dto = AuthUtil.decode(token, secret);
//
//         expect(dto.data.id).toEqual(payload.id);
//     });
// });
//
// describe('Auth API Router', () => {
//     let server: any;
//
//     beforeAll(() => {
//         const router = new Router();
//
//         server = new KoaServer()
//             .getInstance()
//             .use(AuthRouter.getApiRouter())
//             .listen(ServerEnvVar.Port, ServerEnvVar.Host);
//     });
//
//     afterAll(() => {
//         server.close();
//     });
//
//     describe('POST /api/login', () => {
//         test('should ', async () => {
//             const agent = supertest.agent(server);
//
//             const body = {
//                 username: TestEnvVar.SkymapAdminAccount,
//                 password: TestEnvVar.SkymapAdminPassword,
//             };
//
//             const result = await agent
//                 .post('/api/login')
//                 .set('Accept', 'application/json')
//                 .send(body)
//                 .expect(200);
//
//             const dto = JSON.parse(result.text) as UserDTO;
//
//             console.info(dto);
//
//             expect(dto.username).toEqual(body.username);
//         });
//     });
// });
export {};
