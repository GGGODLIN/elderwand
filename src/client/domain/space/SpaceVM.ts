export default interface SpaceVM {
    id: string;
    name: string;
    typeId: number;
    type: Type;
    projectId: string;
    parentId?: string;
    iconId: string;
    icon: Icon;
    photos: Photo[];

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;

    leaves?: SpaceVM[];
    devices?: DeviceVM[];
    checked?: boolean;
}

export interface SpaceTemplateVM {
    id: string;
    name: string;
    typeId: number;
    type: Type;
    parentId?: string;
    iconId: string;
    icon: Icon;
    photos: Photo[];

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}

export interface SpaceTopology {
    nodes: SpaceVM[];
    links: {
        source: string;
        target: string;
    }[];
}

interface Type {
    id: number;
    name: string;
}

interface Icon {
    id: string;
    name: string;
    path: string;
    tags: string[];
}

interface Photo {
    id: string;
    name: string;
    path: string;
    tags: string[];
}

export interface DeviceVM {
    id: string;
    dvId: string;
    name: string;

    typeId: number;
    type: DeviceType;

    spaceId: string;
    projectId: string;
    parentId?: string;

    iconId: string;
    icon: Icon;

    images: Image[];

    modelId: string;
    model: Model;

    leaves?: DeviceVM[];

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
    id: string;
    name: string;
}

interface DeviceType {
    id: number;
    name: string;

    categoryId: string;
    category: DeviceCategory;
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

interface Image {
    id: string;
    name: string;
    path: string;
    tags: string[];
}

interface NetworkCardVM {
    id: string;
    primary?: boolean;
    enable: boolean;
    name?: string;
    ip: string;
    mac: string;
    network: string;
}
