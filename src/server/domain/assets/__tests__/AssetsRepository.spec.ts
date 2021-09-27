import TestEnvVar from '../../../../test/config/TestEnvVar';
import { Platform } from '../../shared/enums/Enums';
import AssetsRepository, {
    AssetsRepositoryCtor,
} from '../infra/AssetsRepository';

describe('AssetsRepository', () => {
    const ctor: AssetsRepositoryCtor = {
        host: TestEnvVar.SkymapApiHost,
        platformId: Platform.ElderWand,
    };

    beforeAll(() => {});

    it('list icons should be successful', async function () {
        const repository = new AssetsRepository(ctor);

        const actual = await repository.listIcons();

        expect(actual).not.toBeNull();

        console.log(actual.results);
    });
});

export {};
