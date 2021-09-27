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

interface DeviceType {
    id: number;
    name: string;
    categoryId: string;
    category: DeviceCategory;
}

interface DeviceCategory {
    id: string;
    name: string;
}
