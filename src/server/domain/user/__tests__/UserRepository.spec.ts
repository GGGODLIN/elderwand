import TestEnvVar from '../../../../test/config/TestEnvVar';
import { Platform } from '../../shared/enums/Enums';
import UserRepository, { UserRepositoryCtor } from '../infra/UserRepository';

describe('User Repository', function () {
    const ctor: UserRepositoryCtor = {
        host: TestEnvVar.SkymapApiHost,
        platformId: Platform.ElderWand,
    };

    it('list users should be successful', async function () {
        const repository = new UserRepository(ctor);

        const actual = await repository.listUsers();

        expect(actual).not.toBeNull();

        console.log(actual);
    });

    it('get the user should be successful', async function () {
        const repository = new UserRepository(ctor);

        const id = 'skymap_admin';

        const actual = await repository.getUser(id);

        expect(actual).not.toBeNull();

        console.log(actual);
    });
});

export {};
