export default interface DeviceVM {
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
    commInfo: any;
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
