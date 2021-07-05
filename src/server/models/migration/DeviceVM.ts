export default interface DeviceVM {
    id: string;
    dvID: string;
    name: string;
    typeID: number;
    type: Type;
    spaceID: string;
    projectId: string;
    parentId?: string;
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
    id: string;
    brandID: string;
    brand: Brand;
}

export interface Brand {
    id: string;
    code: string;
    name: string;
}

export interface Spec {
    id: string;
    manufacturerCode: number;
}
