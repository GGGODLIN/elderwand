// noinspection DuplicatedCode

export default interface DeviceTemplateVM {
    id: string;
    typeId: number;
    type: DeviceType;
    iconId: string;
    icon: Icon;
    modelId: string;
    model: DeviceModel;
    specId: string;
    spec: Spec;
    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
    period?: number;
}

export interface DeviceType {
    id: number;
    name: string;
}

interface Icon {
    id: string;
    name: string;
    path: string;
    tags: string[];
}

interface DeviceModel {
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
    switchPanel: SwitchPanel;
    comPortCount?: number;
    channelCount?: number;
    networkCardCount?: number;
}

interface SwitchPanel {
    pageCount?: number;
    btnCount?: number;
    layout?: string;
    isVRB?: boolean;
    keyValues?: number[];
    modifyStyle?: boolean;
    hasLPress?: boolean;
}
