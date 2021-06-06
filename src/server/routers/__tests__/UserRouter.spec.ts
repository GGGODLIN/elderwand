import supertest from 'supertest';
import PaginationVM from '../../../client/models/PaginationVM';
import TestEnvVar from '../../../test/config/TestEnvVar';
import UserVM from '../../models/user/UserVM';
import KoaServer from '../../server';
import UserRouter, { UserRouterActions } from '../UserRouter';

describe('User Router', function () {
    let server: supertest.SuperTest<supertest.Test>;

    beforeAll(() => {
        server = supertest(
            new KoaServer()
                .use([UserRouter.getApiRouter()])
                .getInstance()
                .callback()
        );
    });

    afterAll(() => {});

    describe('list users', function () {
        it('should be 200', async function () {
            const pathname = UserRouterActions.listUsers();

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                // .query(query)
                .expect(200);

            const actual = response.body as PaginationVM<UserVM>;

            console.log(actual);
        });
    });

    describe('get the user', function () {
        it('should be 200', async function () {
            const username = TestEnvVar.SkymapAdminAccount;
            const pathname = UserRouterActions.getUser(username);

            const response = await server
                .get(pathname)
                .set('Accept', 'application/json')
                // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                // .query(query)
                .expect(200);

            const actual = response.body as UserVM;

            console.log(actual);
        });
    });
});

export {};

// === TODO Remove ===

describe('User API Router', () => {
    // let server: any;
    // beforeAll(() => {
    //     server = new KoaServer()
    //         // .use(AuthRouter.getApiRouter())
    //         // .use(UserRouter.getApiRouter())
    //         .getInstance()
    //         .listen(ServerEnvVar.Port, ServerEnvVar.Host);
    // });
    //
    // afterAll(() => {
    //     server.close();
    // });
    // describe('GET /api/users/:uid', () => {
    //     test('should return user info', async () => {
    //         const { id, token } = await GetUserToken(server);
    //         // console.log(token)
    //
    //         const agent = supertest.agent(server);
    //
    //         const result = await agent
    //             .get(`/api/users`)
    //             .set('Accept', 'application/json')
    //             .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
    //             .expect(200);
    //
    //         const vm: PaginationVM<UserVM> = result.body;
    //
    //         expect(vm.results).not.toBeNull();
    //
    //         // console.log(result.body);
    //     });
    // });
    // describe('POST /api/invite', () => {
    //     test('should return inviting user', async () => {
    //         const { id, token } = await GetUserToken(server);
    //
    //         const agent = supertest.agent(server);
    //
    //         const body = {
    //             role_id: UserRoleEnum.ProjectEngineer,
    //         };
    //
    //         console.log(body);
    //
    //         const result = await agent
    //             .post(`/api/invite/user`)
    //             .set('Accept', 'application/json')
    //             .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
    //             .send(body)
    //             .expect(200);
    //
    //         console.log(result.body);
    //     });
    // });
    // describe('GET /api/invite/user without email', () => {
    //     test('should return inviting user', async () => {
    //         // const { id, token } = await GetUserToken(server);
    //         const { user, token } = await GetInvitingUserToken(server);
    //
    //         const agent = supertest.agent(server);
    //
    //         const url = `/api/invite/user`;
    //
    //         const result = await agent
    //             .get(url)
    //             .set('Accept', 'application/json')
    //             // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
    //             .query({ token: encodeURIComponent(token) })
    //             .expect(200);
    //
    //         console.log(result.body);
    //     });
    // });
});

// async function GetUserToken(
//     server: any
// ): Promise<{ id: string; token: string }> {
//     const agent = supertest.agent(server);
//
//     const body = {
//         username: TestEnvVar.SkymapAdminAccount,
//         password: TestEnvVar.SkymapAdminPassword,
//     };
//
//     const result = await agent
//         .post('/api/login')
//         .set('Accept', 'application/json')
//         .send(body)
//         .expect(200);
//
//     const token = AuthUtil.parseBearer(result.headers[AuthUtil.AuthHeader]);
//     const { id } = result.body as { id: string };
//
//     expect(token).not.toBeNull();
//
//     return { id, token };
// }
//
// async function GetInvitingUserToken(
//     server: any
// ): Promise<{ user: UserVM; token: string }> {
//     const { id, token } = await GetUserToken(server);
//
//     const agent = supertest.agent(server);
//
//     const body = {
//         role_id: UserRoleEnum.ProjectEngineer,
//     };
//
//     const result = await agent
//         .post(`/api/invite/user`)
//         .set('Accept', 'application/json')
//         .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
//         .send(body)
//         .expect(200);
//
//     return { ...result.body };
// }
