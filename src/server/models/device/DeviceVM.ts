export default interface DeviceVM {
    ID: string;
    dvID: string;
    name: string;

    typeID: number;
    type: Type;

    spaceID: string;
    projectID: string;
    parentID?: string;

    iconID: string;
    icon: Icon;

    images: object[]; // TODO

    modelID: string;
    model: Model;

    specID: string;
    spec: Spec;

    attrs?: object[];
    period: number;
    heartbeat: number;

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
}

interface DeviceCategory {
    ID: string;
    name: string;
}

interface Type {
    ID: number;
    name: string;

    categoryID: string;
    category: DeviceCategory;
}

interface Icon {
    ID: string;
    name: string;
    path: string;
    tags: string[];
}

interface Model {
    ID: string;
    name: string;
    brandID: string;
    brand: Brand;
}

interface Brand {
    ID: string;
    code: string;
    name: string;
}

interface Spec {
    ID: string;
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
