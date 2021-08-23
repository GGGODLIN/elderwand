export default interface SpaceVM {
    id: string;
    name: string;
    typeId: number;
    type: Type;
    projectId: string;
    parentId?: string;
    iconId: string;
    icon: Icon;

    devices: DeviceVM[];

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}

export interface SpaceTemplateVM {
    id: string;
    name: string;
    typeId: number;
    type: Type;
    // projectId: string;
    parentId?: string;
    iconId: string;
    icon: Icon;

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

interface Image {
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
    type: Type;

    spaceId: string;
    projectId: string;
    parentId?: string;

    iconId: string;
    icon: Icon;

    images: Image[]; // TODO

    modelId: string;
    model: Model;

    // specId: string;
    // spec: Spec;
    //
    // attrs?: object[];
    // period: number;
    // heartbeat: number;
    //
    // softwareInfo: object;
    //
    // networkCards: NetworkCardVM[];
    //
    // publicIP: string;
    // traceIP: string;
    // imei: string;
    //
    // cloudKeys: string;
    //
    // createdBy: string;
    // updatedBy: string;
    // createdAt: number;
    // updatedAt: number;
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
