import DeviceVM, { CommObject } from './DeviceVMs';

export interface KNXSettingProp {
    device: DeviceVM;
}

export interface Filter {
    networkName: string;
    in: string;
    out: string;
}

export interface ChannelInfo {
    channelNo: number;
    dvId: string;
}

export interface Channel {
    channelNo: number;
    dvId: string;
    device: DeviceVM;
    attrs: ChannelAttr[];
    objs: CommObject[];
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
    valueDefs?: ValueDefs;

    valueKey: string;
    valueType: string;
}

export interface ValueDefs {
    down?: string;
    up?: string;
    start?: string;
    stop?: string;
}

// ExtraAttr TODO rewrite
export interface ExtraAttr {
    attrs: ChannelAttr[];
    objs: CommObject[];
}
