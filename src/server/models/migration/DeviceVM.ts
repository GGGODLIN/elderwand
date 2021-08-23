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
    modelId: string;
    model: Model;
    specId: string;
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
    brandId: string;
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
