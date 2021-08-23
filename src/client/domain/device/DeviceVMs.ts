export interface ProjectVM {
    id: string;
    name: string;
    code: string;
    typeId: number;
    type: ProjectType;
    cloudCodeId: number;
    cloudCode: CloudCode;
    statusId: number;
    status: ProjectStatus;
    expireDate: number;
    ownerId: string;
    owner: Owner;
    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}

export interface ProjectType {
    id: number;
    name: string;
}

export interface CloudCode {
    id: number;
    code: string;
    name: string;
}

export interface ProjectStatus {
    id: number;
    code: string;
    name: string;
}

export interface Owner {
    id: string;
    accountId: string;
    account: Account;
    platformId: number;
    roleId: number;
    statusId: number;
    parentId: string;
}

export interface Account {
    id: string;
    username: string;
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

interface DeviceModel {
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

interface Photo {
    id: string;
    name: string;
    path: string;
    tags: string[];
}

interface NetworkCard {
    id: string;
    primary?: boolean;
    enable: boolean;
    name: string;
    ip: string;
    mac: string;
    network: string;
}

interface DeviceVM {
    id: string;
    name: string;
    dvId: string;
    typeId: number;
    type: DeviceType;
    modelId: string;
    model: DeviceModel;
    projectId: string;
    spaceId: string;
    parentId?: string;
    iconId: string;
    icon: Icon;
    protocols: object[];
    specId: string;
    spec: object;
    channelInfo?: object[];
    switchPanelControlInfo?: object[];
    attrs: object[];
    sendTelRules?: number[];
    imei: string;
    publicIP: string;
    traceIP: string;
    heartbeat?: number;
    images?: Image[];
    period?: number;
    softwareInfo?: object[];
    networkCards?: NetworkCard[];

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}

export interface SpaceVM {
    id: string;
    name: string;
    typeId: number;
    type: object;
    projectId: string;
    parentId?: string;
    iconId: string;
    icon: Icon;
    photos: Photo[];

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;

    // leaves?: SpaceVM[];
    // devices?: DeviceVM[];
    checked?: boolean;
}

export interface SpaceTemplateVM {
    id: string;
    name: string;
    typeId: number;
    type: object;
    parentId?: string;
    iconId: string;
    icon: Icon;
    photos: Photo[];

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}

export interface DeviceTemplateVM {
    id: string;
    name: string;
    typeId: number;
    type: DeviceType;
    modelId: string;
    model: DeviceModel;
    iconId: string;
    icon: Icon;
    images?: Image[];

    protocols: Protocol[];
    specId: string;
    spec: Spec;

    attrs: object[];
    period?: number;
    heartbeat?: number;
    // sendTelRules?:number[];

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
    deletedAt?: number;
}

interface Spec {
    id: string;
    comPortCount?: number;
    networkCardCount?: number;
    KNX?: any;
    RS485?: any;
    EEPCode?: any;
    channelCount?: number;
    switchPanel?: SwitchPanel;
}

interface SwitchPanel {
    pageCount: number;
    btnCount: number;
    layout: string;
    hasLPress?: boolean;
    modifyStyle?: boolean;
    keyValues?: number[];
    isVRB?: boolean;
}

interface Protocol {
    id: string;
    typeId: string;
    type: ProtocolType;
    commInfo?: CommInfo;
}

interface ProtocolType {
    id: string;
    name: string;
}

interface CommInfo {
    pAddr: string;
}

export default DeviceVM;
