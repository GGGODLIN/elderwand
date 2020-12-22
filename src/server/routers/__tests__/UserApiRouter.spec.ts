import KoaServer from '../../server';
import supertest from 'supertest';
import TestEnvVar from '../../../test/config/TestEnvVar';
import { AuthRouter } from '../AuthRouter';
import { AuthUtil } from 'g13-web-shared/server/user';
import { ServerEnvVar } from '../../config/ServerEnvVar';
import { UserPaginationVM } from '../../../client/domain/user/UserVM';
import { UserRoleEnum } from 'g13-web-shared/server/enums';
import { UserRouter } from '../UserRouter';

describe("User API Router", () => {
    let server: any;

    beforeAll(() => {
        server = new KoaServer()
            .use(AuthRouter.getApiRouter())
            .use(UserRouter.getApiRouter())
            .getInstance()
            .listen(ServerEnvVar.Port, ServerEnvVar.Host);
    });

    afterAll(() => {
        server.close();
    });

    describe("GET /api/users/:uid", () => {
        test("should return user info", async () => {
            const { id, token } = await GetUserToken(server);
            // console.log(token)

            const agent = supertest.agent(server);

            const result = await agent
                .get(`/api/users`)
                .set("Accept", "application/json")
                .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .expect(200);

            const vm: UserPaginationVM = result.body

            expect(vm.users).not.toBeNull()
            // console.log(result.body);
        });
    });

    describe("POST /api/invite", () => {
        test("should return inviting user", async () => {
            const { id, token } = await GetUserToken(server);
            // console.log(token)

            const agent = supertest.agent(server);

            const body = {
                role_id: UserRoleEnum.ProjectEngineer
            }

            console.log(body);

            const result = await agent
                .post(`/api/invite/user`)
                .set("Accept", "application/json")
                .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .send(body)
                .expect(200);

            console.log(result.body);
        });
    });

    describe("POST /api/invite without email", () => {
        test("should return inviting user", async () => {
            const { id, token } = await GetUserToken(server);
            // console.log(token)

            const agent = supertest.agent(server);

            const body = {
                role_id: UserRoleEnum.ProjectEngineer
            }

            const result = await agent
                .post(`/api/invite/user`)
                .set("Accept", "application/json")
                .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .send(body)
                .expect(200);

            console.log(result.body);
        });
    });
});

async function GetUserToken(server: any): Promise<{ id: string, token: string }> {
    const agent = supertest.agent(server);

    const body = {
        username: TestEnvVar.SkymapAdminAccount,
        password: TestEnvVar.SkymapAdminPassword,
    };

    const result = await agent
        .post("/api/login")
        .set("Accept", "application/json")
        .send(body)
        .expect(200);

    const token = AuthUtil.parseBearer(result.headers[AuthUtil.AuthHeader]);
    const { id } = result.body as { id: string }

    // console.log(token);
    expect(token).not.toBeNull();

    return { id, token };
}
