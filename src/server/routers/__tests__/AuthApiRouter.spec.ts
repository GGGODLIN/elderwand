import compose from 'koa-compose';
import jwt from 'jsonwebtoken';
import KoaServer from '../../server';
import Router from 'koa-router';
import supertest from 'supertest';
import TestEnvVar from '../../../test/config/TestEnvVar';
import { AuthApiController } from '../../controllers/AuthApiController';
import { AuthJwtDTO } from 'g13-web-shared/server/user/models/JwtDTO';
import { ServerEnvVar } from '../../config/ServerEnvVar';
import { v4 as uuidv4 } from 'uuid';
import { AuthUtil } from 'g13-web-shared/server/user';
import { UserDTO } from 'g13-web-shared/server/user/models';

describe("Verify JWT token", () => {

  test("should be successful", async () => {

    const payload = {
      id: uuidv4(),
      username: "test user",
    };

    const secret = ServerEnvVar.JwtSecret

    const token = AuthUtil.sign(payload, secret);

    const verified = AuthUtil.verify(token, secret);

    expect(verified).toBeTruthy();

    const dto = AuthUtil.decode(token, secret)

    expect(dto.data.id).toEqual(payload.id);

  });
});

describe("Auth API Router", () => {
  let server: any;

  beforeAll(() => {
    const router = new Router();

    router.post("/api/login", AuthApiController.login());

    const routers = compose([router.routes(), router.allowedMethods()]);

    server = new KoaServer()
      .getInstance()
      .use(routers)
      .listen(ServerEnvVar.Port, ServerEnvVar.Host);
  });

  afterAll(() => {
    server.close();
  });

  describe("POST /api/login", () => {
    test("should ", async () => {
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

      const dto = JSON.parse(result.text) as UserDTO
      // console.log(dto);

      expect(dto.username).toEqual(body.username);

    });
  });
});
