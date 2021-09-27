import DeviceVM, { CommObject, ProjectVM } from './DeviceVMs';

export interface Filter {
    networkName: string;
    in: string;
    out: string;
}

export interface ChannelInfo {
    channelNo: number;
    dvId: string;
}

export interface ChannelAttr {
    chId?: number;
    funId: string;
    name: string;
    dpt: string;
    flags: number;

    suffix?: string;
    suffixes?: string;
    ebtn?: boolean;

    objId: number;
    ack4Obj?: number;
    ackSet?: boolean;

    valueKey: string;
    valueType: string;

    createdRT: string;
    rt: string[];
}

export interface ButtonAttr {
    bIdx?: number;
    btn?: number;
    createdRT: string;
    dpt: string;
    flags: number;
    funId: string;
    lpress?: boolean;
    name: string;
    objId: number;
    page: number;
    rt: string[];
    style?: number;
    suffix: string;
    value?: string;
    valueKey: string;
    valueType: string;
    appHidden?: boolean;
    ebtn?: boolean;
}

export interface KNXFlagRule {
    write: number;
    readInit: number;
    fValue: number;
    read: number;
    update: number;
    type: string;
    priority: number;
    communication: number;
    transmit: number;
    // trasmit: number;
    // commumication: number;
}

// Sensor Attr
export interface SensorAttr {
    // Name_zh_CN: string;
    chId: number;
    dpt: string;
    flags: number;
    funId: string;
    name: string;
    objId: number;

    suffixes?: string;
    createdRT: string;
    rt: string[];
    // susffixes_zh_CN?: string;
    ack4Obj?: number;
    ackSet?: boolean;

    unit?: string;
    unitName?: string;
    valueDefs?: SensorAttrValueDefs;

    valueKey: string;
    valueType: string;
}

export interface SensorAttrValueDefs {
    down?: string;
    up?: string;
    start?: string;
    stop?: string;
}

export interface GeneralDeviceAttr {
    objId: number;
    valueKey: string;
    bsuffixId: string;
    valueType: string;
    appHidden?: boolean;
    createdRT: string;
    dpt: string;
    flags: number;
    funId: string;
    name: string;
    suffixes?: string;
    rt: string[];
    valueDefs?: GeneralDeviceAttrValueDefs;
}

export interface GeneralDeviceAttrValueDefs {
    flase: string;
    true: string;
}

export interface ExtraAttr {
    createdRT: string;
    dpt: string;
    flags: number;
    lpress?: boolean;
    bIdx?: number;
    funId: string;
    name: string;
    rt: string[];
    valueKey: string;
    appHidden?: boolean;
    objId: number;
    style?: number;
    valueType: string;
    btn?: number;
    page: number;
    suffix: string;
    value?: string;
    ebtn?: boolean;
    range?: number[];
    step?: number;
}
