export default interface DeviceDTO {
    id: string;
    name: string;

    typeId: number;
    type: Type;
    modelId: string;
    model: Model;

    projectId: string;
    spaceId: string;
    parentId?: string;
    iconId: string;
    icon: Icon;
    images: Image[];

    dvId: string;

    protocols: Protocol[];

    specId: string;
    spec: Spec;

    channelInfo: ChannelInfo[];
    switchPanelControlInfo: SwitchPanelControlInfo[];

    attrs?: object[];
    period: number;
    heartbeat: number;
    sendTelRules: number[];

    softwareInfo: SoftwareInfo[];

    imei: string;
    publicIP: string;
    traceIP: string;
    networkCards: NetworkCardDTO[];

    cloudKeys: string;

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
    deletedAt?: number;
}

export interface ChannelInfo {
    channelNo: number;
    dvId: string;
}

export interface SwitchPanelControlInfo {
    button: number;
    lPress: boolean;
    connectionInfo: ConnectionInfo[];
}

export interface ConnectionInfo {
    objectId: number;
    dvId: string;
}

interface Protocol {
    id: string;
    typeId: string;
    type: ProtocolType;
    commInfo: object;
}

interface ProtocolType {
    id: string;
    name: string;
}

interface SoftwareInfo {
    name: string;
    version?: string;
}

interface DeviceCategory {
    id: string;
    name: string;
}

interface Type {
    id: number;
    name: string;

    categoryId: string;
    category: DeviceCategory;
}

interface Icon {
    id: string;
    name: string;
    path: string;
    tags: string[];
}

interface Image {
    id: string;
    name: string;
    path: string;
    tags: string[];
}

interface Model {
    id: string;
    name: string;
    brandId: string;
    brand: Brand;
}

interface Brand {
    id: string;
    code: string;
    name: string;
}

interface Spec {
    id: string;
    comPortCount?: number;
    channelCount?: number;
    networkCardCount?: number;
    manufacturerCode?: number;
    switchPanel?: object;
}

export interface NetworkCardDTO {
    id: string;
    primary?: boolean;
    enable: boolean;
    name: string;
    ip: string;
    mac: string;
    network: string;
}
