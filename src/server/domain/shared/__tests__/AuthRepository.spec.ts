import TestEnvVar from '../../../../test/config/TestEnvVar';
import { Platform } from '../enums/Enums';
import AuthRepository, { AuthRepositoryCtor } from '../infra/AuthRepository';

describe('Auth Repository', function () {
    const ctor: AuthRepositoryCtor = {
        host: TestEnvVar.SkymapApiHost,
        platformId: Platform.ElderWand,
    };
    it('login should be successful', async function () {
        const username = TestEnvVar.SkymapAdminAccount;
        const password = TestEnvVar.SkymapAdminPassword;

        const repository = new AuthRepository(ctor);

        const actual = await repository.login(username, password);

        expect(actual).not.toBeNull();

        console.log(actual);
    });
});
export {};
