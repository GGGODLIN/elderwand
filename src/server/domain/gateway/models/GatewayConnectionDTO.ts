export default interface GatewayConnectionDTO {
    ID: string;
    publicIP: string;
    traceIP: string;
    softwareInfo: object;
    imei: string;
    networkCards: NetworkCard[];
    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}

interface NetworkCard {
    ID: string;
    primary?: boolean;
    enable: boolean;
    IP: string;
    mac: string;
    network: string;
    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}
