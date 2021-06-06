import TestEnvVar from '../../../../test/config/TestEnvVar';
import TestDataGenerator from '../../../../test/utils/TestDataGenerator';
import { Platform } from '../../shared/enums/Enums';
import GatewayConnectionRepository, {
    GatewayConnectionRepositoryCtor,
} from '../infra/GatewayConnectionRepository';

describe('Gateway Repository', function () {
    const ctor: GatewayConnectionRepositoryCtor = {
        host: TestEnvVar.SkymapApiHost,
        platformId: Platform.ElderWand,
    };

    it('gateway connect should be successful', async function () {
        const repository = new GatewayConnectionRepository(ctor);

        const ip = TestEnvVar.GatewayClientIP;

        const vo = TestDataGenerator.newGatewayConnectVO({ ip: ip });

        const actual = await repository.saveGatewayConnection(vo);

        expect(actual).not.toBeNull();

        console.log(actual);
    });

    it('list gateways should be successful', async function () {
        const repository = new GatewayConnectionRepository(ctor);

        const ip = TestEnvVar.GatewayClientIP;

        const actual = await repository.listGatewayConnections(ip);

        expect(actual).not.toBeNull();

        console.log(actual);
    });
});

export {};
