export default interface GatewayConnectionVM {
    id: string;
    publicIP: string;
    traceIP: string;
    softwareInfo: object;
    imei: string;
    networkCards: NetworkCard[];
    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;

    dvId: string;
    isBound: boolean;
}

interface NetworkCard {
    id: string;
    primary?: boolean;
    enable: boolean;
    ip: string;
    mac: string;
    network: string;
    createdBy: string;
    createdAt: number;
    updatedAt: number;
}

// interface SoftwareInfo {
//     ADHardKeySun: string;
//     ADModbusSun: string;
//     SationKNXSun: string;
//     driftice: string;
//     image: string;
//     libadmodbus: string;
//     sun: string;
// }
