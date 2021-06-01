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
// === TODO Remove ===

// describe("Project API Router", () => {
//     let server: any;
//
//     beforeAll(() => {
//         server = new KoaServer()
//             .use(AuthRouter.getApiRouter())
//             .use(UserRouter.getApiRouter())
//             .use(ProjectRouter.getApiRouter())
//             .getInstance()
//             .listen(ServerEnvVar.Port, ServerEnvVar.Host);
//     });
//
//     afterAll(() => {
//         server.close();
//     });
//
//     describe("GET /api/project/code/generate", () => {
//         test("should return project code", async () => {
//             const agent = supertest.agent(server);
//
//             const url = "/api/project/code/generate";
//
//             const result = await agent
//                 .get(url)
//                 .set("Accept", "application/json")
//                 .expect(200);
//
//             const vm = JSON.parse(result.text) as { code: string }
//
//             console.log(vm);
//
//             expect(vm.code).not.toBe("");
//         });
//     });
//
//     describe("POST /api/projects", () => {
//         test("should return a project", async () => {
//             const agent = supertest.agent(server);
//
//             const operator = await GetSkyMapAdmin(server);
//             const { code } = await GetProjectCode(server)
//
//             const secret = ServerEnvVar.JwtSecret
//             const payload = {
//                 id: operator.id,
//                 projectname: operator.projectname,
//             };
//             const token = AuthUtil.sign(payload, secret);
//
//             const body = {
//                 cloud_code_id: 1,
//                 code: code,
//                 expire_date: TimeUtil.now().add(3, "M").valueOf(),
//                 name: `${faker.company.companyName()}_${TimeUtil.now()}`.replace(" ", ""),
//                 owner_id: operator.id
//             };
//
//             console.log(body);
//
//             const url = "/api/projects"
//
//             const result = await agent
//                 .post(url)
//                 .set("Accept", "application/json")
//                 .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
//                 .send(body)
//                 .expect(200);
//
//             const vm = JSON.parse(result.text) as ProjectDTO
//             console.log(vm);
//         });
//     });
//
// });
//
// async function GetSkyMapAdmin(server: any): Promise<UserDTO> {
//     const agent = supertest.agent(server);
//
//     const url = "/api/login";
//
//     const body = {
//         projectname: TestEnvVar.SkymapAdminAccount,
//         password: TestEnvVar.SkymapAdminPassword,
//     };
//
//     const result = await agent
//         .post(url)
//         .set("Accept", "application/json")
//         .send(body)
//         .expect(200);
//
//     const dto = JSON.parse(result.text) as UserDTO
//     // console.log(dto);
//
//     return dto;
// }
//
// async function GetProjectCode(server: any): Promise<{ code: string }> {
//     const agent = supertest.agent(server);
//
//     const url = "/api/project/code/generate";
//
//     const result = await agent
//         .get(url)
//         .set("Accept", "application/json")
//         .expect(200);
//
//     const dto = JSON.parse(result.text) as { code: string }
//
//     return dto;
// }
