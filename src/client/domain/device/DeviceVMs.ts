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

export interface Icon {
    id: string;
    name: string;
    path: string;
    tags: string[];
}

export interface Image {
    id: string;
    name: string;
    path: string;
    tags: string[];
}

export interface Photo {
    id: string;
    name: string;
    path: string;
    tags: string[];
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

interface Brand {
    id: string;
    code: string;
    name: string;
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

export interface Protocol {
    id: string;
    typeId: string;
    type: ProtocolType;
    commInfo?: CommInfo;
}

interface ProtocolType {
    id: string;
    name: string;
}

export interface CommInfo {
    // KNX Gateway
    pAddr?: string;
    filters?: object[];
    UPDs?: UDP[];
    // KNX actuator
    objs?: CommObject[];
    // KNX Sensor
    // objs: {
    //     gAddrs: string[];
    //     objId: number;
    // }[];
}

interface UDP {
    enableIpTunneling: boolean;
    ip: string;
    name: string;
    obtainIpType: number;
    port: number;
    type: string;
}

export interface CommObject {
    ch?: number;
    gAddrs: string[];
    objId: number;
    attrObjId?: number;
    ebtn?: boolean;

    // btn
    btn?: number;
    lpress?: boolean;
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
    spec: DeviceTemplateSpec;

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

interface DeviceTemplateSpec {
    id: string;
    comPortCount?: number;
    networkCardCount?: number;
    KNX?: any;
    RS485?: any;
    EEPCode?: any;
    channelCount?: number;
    switchPanel?: SwitchPanel;
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
    parent?: DeviceVM;

    iconId: string;
    icon: Icon;
    images?: Image[];

    protocols: Protocol[];
    specId: string;
    spec: DeviceSpec;

    attrs: object[];
    heartbeat?: number;
    period?: number;
    sendTelRules?: number[];

    channelInfo?: object[];
    switchPanelControlInfo?: SwitchPanelControlInfo[];
    imei: string;
    publicIP: string;
    traceIP: string;
    softwareInfo?: SoftwareInfo[];
    networkCards?: NetworkCard[];

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;

    leaves?: DeviceVM[];
}

export interface SwitchPanelControlInfo {
    button: number;
    connectionInfo: ConnectionInfo[];
}

export interface ConnectionInfo {
    // objectId: number;
    dvId: string;
}

export interface SoftwareInfo {
    name: string;
    version?: string;
}

export interface DeviceSpec {
    id: string;
    comPortCount?: number;
    networkCardCount?: number;
    channelCount?: number;
    KNX?: any;
    RS485?: any;
    EEPCode?: any;
    switchPanel?: SwitchPanel;
}

export interface NetworkCard {
    id: string;
    primary?: boolean;
    enable: boolean;
    network: string;
    name: string;
    ip: string;
    mac: string;
}

export default DeviceVM;
