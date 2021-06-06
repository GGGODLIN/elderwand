// noinspection DuplicatedCode

export default interface DeviceTemplateVM {
    id: string;
    typeId: number;
    type: Type;
    iconId: string;
    icon: Icon;
    modelId: string;
    model: Model;
    specId: string;
    spec: Spec;
    attrs: string;
    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
    period?: number;
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

interface Model {
    id: string;
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
    manufacturerCode: number;
}
