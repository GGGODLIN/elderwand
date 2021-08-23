import TestEnvVar from '../../../../test/config/TestEnvVar';
import { Platform } from '../../shared/enums/Enums';
import SpaceRepository, {
    SpaceRepositoryCtor,
} from '../../space/infra/SpaceRepository';
import SpaceDTO from '../../space/models/SpaceDTO';

describe('Space Repository', function () {
    const ctor: SpaceRepositoryCtor = {
        host: TestEnvVar.SkymapApiHost,
        platformId: Platform.ElderWand,
    };

    it('list spaces should be successful', async function () {
        const pid = TestEnvVar.NewTargetProjectCode;

        const repository = new SpaceRepository(ctor);

        const actual = await repository.listSpaces(pid);

        expect(actual).not.toBeNull();

        console.log(actual);
    });

    it('get the space should be successful', async function () {
        const pid = TestEnvVar.NewTargetProjectCode;

        const repository = new SpaceRepository(ctor);

        const dto = await repository.listSpaces(pid);

        console.log(dto);

        const space = dto.results[0] as SpaceDTO;

        const actual = await repository.getSpace(space.id, space.projectId);

        expect(actual).not.toBeNull();
        expect(actual.id).toEqual(space.id);

        console.log(actual);
    });

    it('list space templates should be successful', async function () {
        const pid = TestEnvVar.NewTargetProjectCode;

        const repository = new SpaceRepository(ctor);

        const actual = await repository.listSpaceTemplates();

        expect(actual).not.toBeNull();

        console.log(actual);
    });
});
