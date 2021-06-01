export default interface GatewayConnectVO {
    id?: string;
    publicIP: string;
    traceIP: string;
    networkCards: NetworkCard[];
    swInfos: object;
}

interface NetworkCard {
    enable: boolean;
    ip: string;
    name: string;
    network: string;
    mac: string;
}
