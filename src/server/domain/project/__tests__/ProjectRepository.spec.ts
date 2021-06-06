import TestEnvVar from '../../../../test/config/TestEnvVar';
import { Platform } from '../../shared/enums/Enums';
import ProjectRepository, {
    ProjectRepositoryCtor,
} from '../infra/ProjectRepository';

describe('ProjectRepository', function () {
    const ctor: ProjectRepositoryCtor = {
        host: TestEnvVar.SkymapApiHost,
        platformId: Platform.ElderWand,
    };

    it('list project should be successful', async function () {
        const repository = new ProjectRepository(ctor);

        const actual = await repository.listProjects();

        expect(actual).not.toBeNull();

        console.log(actual);
    });

    it('get the project should be successful', async function () {
        const code = TestEnvVar.NewTargetProjectCode;

        const repository = new ProjectRepository(ctor);

        const actual = await repository.getProject(code);

        expect(actual).not.toBeNull();

        console.log(actual);
    });
});

export {};
