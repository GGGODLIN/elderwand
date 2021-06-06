import TestEnvVar from '../../../../test/config/TestEnvVar';
import MigrationRepository, {
    MigrationRepositoryCtor,
} from '../infra/MigrationRepository';

describe('Migration Repository', function () {
    const params: MigrationRepositoryCtor = {
        host: TestEnvVar.SkymapApiHost,
        dbname: TestEnvVar.MigrationMongodbSake,
        conn: TestEnvVar.MigrationSourceMongodbUri,
        version: 200,
    };

    it('list source projects should be successful', async () => {
        const repository = new MigrationRepository(params);

        const actual = await repository.listProjects();

        expect(actual).not.toBeNull();

        console.log(actual);
    });

    it('get the source project should be successful', async () => {
        const repository = new MigrationRepository(params);

        const code = TestEnvVar.MigrationTargetProjectCode;

        const actual = await repository.getProject(code);

        expect(actual).not.toBeNull();

        console.log(actual);
    });

    it('list source spaces by project code should be successful', async () => {
        const repository = new MigrationRepository(params);

        const code = TestEnvVar.MigrationTargetProjectCode;

        const actual = await repository.listSpaces(code);

        expect(actual).not.toBeNull();

        console.log(actual);
    });

    it('list source devices by project code should be successful', async () => {
        const repository = new MigrationRepository(params);

        const code = TestEnvVar.MigrationTargetProjectCode;

        const actual = await repository.listDevices(code);

        expect(actual).not.toBeNull();

        console.log(actual);
    });

    it('import project with new project code should be successful', async () => {
        const repository = new MigrationRepository(params);

        const code = TestEnvVar.MigrationTargetProjectCode;

        const vo = {
            code: TestEnvVar.NewTargetProjectCode,
        };

        const actual = await repository.importProject(code, vo);

        expect(actual).not.toBeNull();

        console.log(actual);
    });

    it('import spaces with new project code should be successful', async () => {
        const repository = new MigrationRepository(params);

        const code = TestEnvVar.MigrationTargetProjectCode;

        const vo = {
            code: TestEnvVar.NewTargetProjectCode,
        };

        const actual = await repository.importSpaces(code, vo);

        expect(actual).not.toBeNull();

        console.log(actual);
    });

    it('import spaces with new project code should be successful', async () => {
        const repository = new MigrationRepository(params);

        const code = TestEnvVar.MigrationTargetProjectCode;

        const vo = {
            code: TestEnvVar.NewTargetProjectCode,
        };

        const actual = await repository.importDevices(code, vo);

        expect(actual).not.toBeNull();

        console.log(actual);
    }, 10000);

    it('list source device templates should be successful', async () => {
        const repository = new MigrationRepository({
            ...params,
            dbname: TestEnvVar.MigrationMongodbThings,
        });

        const actual = await repository.listDeviceTemplates();

        expect(actual).not.toBeNull();

        console.log(actual);
    }, 10000);

    it('import device templates should be successful', async () => {
        const repository = new MigrationRepository({
            ...params,
            dbname: TestEnvVar.MigrationMongodbThings,
        });

        const actual = await repository.importDeviceTemplates();

        expect(actual).not.toBeNull();

        console.log(actual);
    }, 10000);
});

export {};
