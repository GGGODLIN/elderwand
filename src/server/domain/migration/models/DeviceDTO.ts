export default interface DeviceDTO {
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
    modelID: string;
    model: Model;
    specID: string;
    spec: Spec;
    attrs?: object[];
    softwareInfo: string;
    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}

export interface Type {
    id: number;
    name: string;
}

export interface Icon {
    id: string;
    name: string;
    path: string;
    tags: string[];
}

export interface Model {
    ID: string;
    brandID: string;
    brand: Brand;
}

export interface Brand {
    id: string;
    code: string;
    name: string;
}

export interface Spec {
    ID: string;
    manufacturerCode: number;
}
