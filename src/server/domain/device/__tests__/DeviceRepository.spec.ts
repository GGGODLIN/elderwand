import TestEnvVar from '../../../../test/config/TestEnvVar';
import MigrationRepository, {
    MigrationRepositoryCtor,
} from '../../migration/infra/MigrationRepository';
import { Platform } from '../../shared/enums/Enums';
import DeviceRepository, {
    DeviceRepositoryCtor,
} from '../infra/DeviceRepository';
import DeviceDTO from '../models/DeviceDTO';
import DeviceTemplateDTO from '../models/DeviceTemplateDTO';

describe('Device Repository', function () {
    const ctor: DeviceRepositoryCtor = {
        host: TestEnvVar.SkymapApiHost,
        platformId: Platform.ElderWand,
    };

    beforeAll(() => {
        const params: MigrationRepositoryCtor = {
            host: TestEnvVar.SkymapApiHost,
            dbname: TestEnvVar.MigrationMongodbSake,
            conn: TestEnvVar.MigrationSourceMongodbUri,
            version: 200,
        };

        new MigrationRepository(params).importDeviceTemplates().then((res) => {
            console.log(res);
        });
    });

    it('list devices should be successful', async function () {
        const pid = TestEnvVar.NewTargetProjectCode;

        const repository = new DeviceRepository(ctor);

        const actual = await repository.listDevices(pid);

        expect(actual).not.toBeNull();

        console.log(actual);
    });

    it('get the device should be successful', async function () {
        const pid = TestEnvVar.NewTargetProjectCode;

        const repository = new DeviceRepository(ctor);

        const dto = await repository.listDevices(pid);

        const device = dto.results[0] as DeviceDTO;

        const actual = await repository.getDevice(device.id, device.projectId);

        expect(actual).not.toBeNull();
        expect(actual.id).toEqual(device.id);
    });

    it('list device templates should be successful', async function () {
        // const pid = TestEnvVar.NewTargetProjectCode;

        const repository = new DeviceRepository(ctor);

        const dto = await repository.listDeviceTemplates();

        const actual = dto.results[0] as DeviceTemplateDTO;

        expect(actual).not.toBeNull();

        console.log(actual);
    });

    it('list device function types should be successful', async function () {
        const repository = new DeviceRepository(ctor);

        const actual = await repository.listDeviceFunctionPointTopology();

        expect(actual).not.toBeNull();

        console.log(JSON.stringify(actual, null, 2));
    });
});

export {};
