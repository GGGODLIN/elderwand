import TestEnvVar from '../../../../test/config/TestEnvVar';
import { Platform } from '../../shared/enums/Enums';
import DeviceRepository, {
    DeviceRepositoryCtor,
} from '../infra/DeviceRepository';
import DeviceDTO from '../models/DeviceDTO';

describe('Device Repository', function () {
    const ctor: DeviceRepositoryCtor = {
        host: TestEnvVar.SkymapApiHost,
        platformId: Platform.ElderWand,
    };

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
});

export {};
