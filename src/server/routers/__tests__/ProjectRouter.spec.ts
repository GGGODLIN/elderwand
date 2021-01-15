import faker from 'faker';
import KoaServer from '../../server';
import supertest from 'supertest';
import TestEnvVar from '../../../test/config/TestEnvVar';
import { AuthRouter } from '../AuthRouter';
import { ProjectDTO } from '../../domain/project/ProjectDTO';
import { ProjectRouter } from '../ProjectRouter';
import { ServerEnvVar } from '../../config/ServerEnvVar';
import { TimeUtil } from '../../utils/TimeUtil';
import { UserDTO } from 'g13-web-shared/server/user/models';
import { UserRouter } from '../UserRouter';
import { AuthUtil } from 'g13-web-shared/server/user';

describe("Project API Router", () => {
    let server: any;

    beforeAll(() => {
        server = new KoaServer()
            .use(AuthRouter.getApiRouter())
            .use(UserRouter.getApiRouter())
            .use(ProjectRouter.getApiRouter())
            .getInstance()
            .listen(ServerEnvVar.Port, ServerEnvVar.Host);
    });

    afterAll(() => {
        server.close();
    });

    describe("GET /api/project/code/generate", () => {
        test("should return project code", async () => {
            const agent = supertest.agent(server);

            const url = "/api/project/code/generate";

            const result = await agent
                .get(url)
                .set("Accept", "application/json")
                .expect(200);

            const vm = JSON.parse(result.text) as { code: string }

            console.log(vm);

            expect(vm.code).not.toBe("");
        });
    });

    describe("POST /api/projects", () => {
        test("should return a project", async () => {
            const agent = supertest.agent(server);

            const operator = await GetSkyMapAdmin(server);
            const { code } = await GetProjectCode(server)

            const secret = ServerEnvVar.JwtSecret
            const payload = {
                id: operator.id,
                username: operator.username,
            };
            const token = AuthUtil.sign(payload, secret);

            const body = {
                cloud_code_id: 1,
                code: code,
                expire_date: TimeUtil.now().add(3, "M").valueOf(),
                name: `${faker.company.companyName()}_${TimeUtil.now()}`.replace(" ", ""),
                owner_id: operator.id
            };

            console.log(body);

            const url = "/api/projects"

            const result = await agent
                .post(url)
                .set("Accept", "application/json")
                .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
                .send(body)
                .expect(200);

            const vm = JSON.parse(result.text) as ProjectDTO
            console.log(vm);
        });
    });

});

async function GetSkyMapAdmin(server: any): Promise<UserDTO> {
    const agent = supertest.agent(server);

    const url = "/api/login";

    const body = {
        username: TestEnvVar.SkymapAdminAccount,
        password: TestEnvVar.SkymapAdminPassword,
    };

    const result = await agent
        .post(url)
        .set("Accept", "application/json")
        .send(body)
        .expect(200);

    const dto = JSON.parse(result.text) as UserDTO
    // console.log(dto);

    return dto;
}

async function GetProjectCode(server: any): Promise<{ code: string }> {
    const agent = supertest.agent(server);

    const url = "/api/project/code/generate";

    const result = await agent
        .get(url)
        .set("Accept", "application/json")
        .expect(200);

    const dto = JSON.parse(result.text) as { code: string }

    return dto;
}
