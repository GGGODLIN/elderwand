export default interface DeviceDTO {
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

    images: object[]; // TODO

    modelId: string;
    model: Model;

    specId: string;
    spec: Spec;

    attrs?: object[];
    period: number;
    heartbeat: number;

    softwareInfo: object;

    networkCards: NetworkCardDTO[];

    publicIP: string;
    traceIP: string;
    imei: string;

    cloudKeys: string;

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
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

export interface NetworkCardDTO {
    id: string;
    primary?: boolean;
    enable: boolean;
    name: string;
    ip: string;
    mac: string;
    network: string;
}
