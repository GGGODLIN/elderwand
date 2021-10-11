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
    name: string;

    funId: string;
    dpt: string;
    suffix?: string;
    flags: number;

    objId: number;
    ack4Obj?: number;
    ackSet?: boolean;

    valueKey: string;
    valueType: string;

    createdRT: string;
    rt: string[];

    // ebtn?: boolean;
}

export interface ButtonAttr {
    name: string;
    objId: number;

    dpt: string;
    flags: number;
    funId: string;
    suffix: string;

    page: number;
    bIdx?: number;
    btn?: number;
    style?: number;
    lpress?: boolean;

    rt: string[];
    createdRT: string;
    valueKey: string;
    valueType: string;
    // value?: string;
    // appHidden?: boolean;
    // ebtn?: boolean;
}

export interface ExtraAttr {
    name: string;
    objId: number;

    funId: string;
    dpt: string;
    suffix: string;
    flags: number;

    createdRT: string;
    rt: string[];

    valueKey: string;
    valueType: string;

    chId?: number;
    page?: number;
    btn?: number;
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
