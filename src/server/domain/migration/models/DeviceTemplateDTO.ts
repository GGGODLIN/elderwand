// noinspection DuplicatedCode

export default interface DeviceTemplateDTO {
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

    createdBy: string;
    updatedBy: string;
    createdAt: number;
    updatedAt: number;
}

export interface DeviceType {
    id: number;
    name: string;
    categoryId: string;
    category: DeviceCategory;
}

export interface DeviceCategory {
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
    commInfo?: CommInfo;
}

export interface ProtocolType {
    id: string;
    name: string;
}

export interface CommInfo {
    pAddr: string;
}

export interface DeviceTemplateSpec {
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
    isIPR: boolean;
    // maxCh?: number
    // chCnt?: number
}
export interface RS485 {
    mdbConf: MdbConf;
    phyConf: PhyConf;
    // chCnt?: number
    // maxCh?: number
}

export interface MdbConf {
    RTU: boolean;
    master: boolean;
    std: boolean;
    broadcast?: boolean;
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

interface SwitchPanel {
    pageCount?: number;
    btnCount?: number;
    layout?: string;
    isVRB?: boolean;
    keyValues?: number[];
    modifyStyle?: boolean;
    hasLPress?: boolean;
}
