import { Filter } from './KnxDataTypes';

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

export interface DeviceType {
    id: number;
    name: string;
    categoryId: string;
    category: Category;
}

export interface Category {
    id: string;
    name: string;
}

export interface DeviceModel {
    id: string;
    name: string;
    brandId: string;
    brand: Brand;
}

export interface Brand {
    id: string;
    code: string;
    name: string;
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

export interface Protocol {
    id: string;
    typeId: string;
    type: ProtocolType;
    commInfo: CommInfo;
}

export interface CommInfo {
    UDPs?: object[];
    pAddr: string;
    objs: CommObject[];
    filters?: Filter[];
}

export interface CommObject {
    ch?: number;
    btn?: number;
    objId: number;
    attrObjId?: number;
    gAddrs: string[];
    ebtn?: boolean;
}

export interface ProtocolType {
    id: string;
    name: string;
}

export interface DeviceSpec {
    id: string;
    comPortCount?: number;
    networkCardCount?: number;
    channelCount?: number;
    maxChannelCount?: number;
    switchPanel?: SwitchPanel;
    KNX?: KNX;
    RS485?: RS485;
    EnOcean?: EnOcean;
}

export interface KNX {
    // chCnt?: number;
    // maxCh?: number;
    isIPR?: boolean;
}

export interface RS485 {
    chCnt?: number;
    maxCh?: number;
    mdbConf: MdbConf;
    phyConf: PhyConf;
}

export interface MdbConf {
    RTU: boolean;
    master: boolean;
    std: boolean;
}

export interface PhyConf {
    bRate: number;
    dBit: number;
    ptyBit: number;
    sBit: number;
}

export interface EnOcean {
    EEPCode: string;
}

export interface SwitchPanel {
    pageCount: number;
    btnCount: number;
    hasLPress?: boolean;
    layout: string;
    modifyStyle: boolean;
}

export interface ChannelInfo {
    channelNo: number;
    dvId: string;
}

export interface SwitchPanelControlInfo {
    button: number;
    connectionInfo: ConnectionInfo[];
    lPress?: boolean;
}

export interface ConnectionInfo {
    objectId: number;
    dvId: string;
}

export interface SoftwareInfo {
    name: string;
    version?: string;
}

export interface NetworkCard {
    id: string;
    name: string;
    ip: string;
    mac: string;
    network: string;

    primary: boolean;
    enable: boolean;

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}

interface DeviceTemplateSpec {
    id: string;
    comPortCount?: number;
    networkCardCount?: number;
    channelCount?: number;
    maxChannelCount?: number;
    switchPanel?: SwitchPanel;
    KNX?: KNX;
    RS485?: RS485;
    EnOcean?: EnOcean;
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

interface DeviceVM {
    id: string;
    name: string;
    dvId: string;
    typeId: number;
    type: DeviceType;
    modelId: string;
    model: DeviceModel;

    projectId: string;
    project: ProjectVM;
    spaceId: string;
    space: SpaceVM;

    parentId?: string;
    parent?: DeviceVM;

    iconId: string;
    icon: Icon;
    images?: Image[];

    protocols: Protocol[];
    channelInfo?: ChannelInfo[];
    switchPanelControlInfo?: SwitchPanelControlInfo[];

    specId: string;
    spec: DeviceSpec;

    attrs: object[];
    sendTelRules?: number[];
    heartbeat?: number;
    period?: number;
    softwareInfo?: SoftwareInfo[];

    networkCards?: NetworkCard[];
    imei: string;
    publicIP: string;
    traceIP: string;

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
    deletedAt?: number;

    leaves?: DeviceVM[];
}

export default DeviceVM;
