export default interface DeviceVM {
    id: string;
    dvId: string;
    name: string;

    typeId: number;
    type: Type;

    spaceId: string;
    projectId: string;
    parentId?: string;

    iconId: string;
    icon: Icon;

    images: Image[];

    modelId: string;
    model: Model;

    specId: string;
    spec: Spec;

    attrs?: object[];
    period: number;
    heartbeat: number;
    sendTelRules: number[];

    softwareInfo: object;

    networkCards: NetworkCardVM[];

    publicIP: string;
    traceIP: string;
    imei: string;

    cloudKeys: string;

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
    deletedAt?: number;
}

interface Image {
    id: string;
    name: string;
    path: string;
    tags: string[];
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

export interface NetworkCardVM {
    id: string;
    primary?: boolean;
    enable: boolean;
    name: string;
    ip: string;
    mac: string;
    network: string;
}
