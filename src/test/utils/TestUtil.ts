import * as Dotenv from 'dotenv';
import supertest from 'supertest';
import { AuthApiRouterActions } from '../../server/routers/AuthRouter';
import TestEnvVar from '../config/TestEnvVar';

export default class TestUtil {
    static loadDotEnv() {
        const name = '.env.test';

        const file_path = `${process.cwd()}/${name}`;

        const output = Dotenv.config({ path: file_path });

        console.log(output);

        return output.parsed;
    }

    static async getToken(
        server: supertest.SuperTest<supertest.Test>,
        option?: { username?: string; password?: string }
    ) {
        const pathname = AuthApiRouterActions.login();

        const body = {
            username: TestEnvVar.SkymapAdminAccount,
            password: TestEnvVar.SkymapAdminPassword,
            ...option,
        };

        const response = await server
            .post(pathname)
            .set('Accept', 'application/json')
            // .set(AuthUtil.AuthHeader, AuthUtil.newBearer(token))
            // .query(query)
            .send(body)
            .expect(200);

        return response.headers['authorization']?.slice(7);
    }
}
