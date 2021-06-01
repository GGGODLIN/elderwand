import GatewayConnectVO from '../../server/domain/gateway/models/GatewayConnectVO';

export default class TestDataGenerator {
    static newGatewayConnectVO(option: { ip: string }): GatewayConnectVO {
        const ip = option.ip;

        const vo: GatewayConnectVO = {
            // id: '1a6a908e-3bdf-49a5-82a3-1258347adfb0',
            publicIP: `${ip}`,
            traceIP: `192.168.0.1,${ip}`,
            networkCards: [
                {
                    enable: true,
                    ip: '192.168.0.100',
                    name: 'eth0',
                    network: 'internet',
                    mac: '22:00:21:33:66:22',
                },
                {
                    enable: true,
                    ip: '172.168.31.99',
                    name: 'eth1',
                    network: 'intranet',
                    mac: '22:00:21:33:66:11',
                },
            ],
            swInfos: {
                ADHardKeySun: '0.0.0.1',
                ADModbusSun: '1.0.6.1',
                SationKNXSun: '0.0.0.1',
                driftice: '3.0.17',
                image: '0.3',
                libadmodbus: '2.0.5.2',
                sun: '1.1.5.0',
            },
        };

        return vo;
    }
}
