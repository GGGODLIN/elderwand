// noinspection DuplicatedCode

export interface ProjectPreviewDTO {
    displayName: string;
    projectCode: string;
    projectName: string;
    cloudCode: number;
    owner: string;
}

export interface SpacePreviewDTO {
    ID: string;
    icon: string;
    name: string;
    parentID?: string;
    bgPic?: string;
}

export interface DevicePreviewDTO {
    id: string;
    dvId: string;
    name: string;
    icon: string;
    image: string;
    deviceType: number;
    parentId: string;
    spaceId: string;
}

export interface DeviceTemplatePreviewDTO {
    DocTag: string;
    Name: string;
    Icon: string;
    Image: string;
    DeviceType: number;
    HwInfo: HwInfo;
    Attrs?: object[];
    ProtocolInfo: ProtocolInfo[];
    CommInfo?: CommInfo;
    ComPorts?: ComPorts;
    NetworkCardCount?: number;
    Status: any;
    Period?: number;
    Switch?: Switch;
    KNX?: Knx2;
    RS485?: Rs485;
}

interface HwInfo {
    brand: string;
    class: string;
    model: string;
}

interface ProtocolInfo {
    protocol: string;
    protocolType?: string;
}

interface CommInfo {
    KNX?: Knx;
    protocol4GW: string;
}

interface Knx {
    pAddr: string;
}

interface ComPorts {
    portCnt: number;
}

interface Switch {
    btnCnt: number;
    hasLPress?: boolean;
    layout: string;
    modifyStyle?: boolean;
    pageCount: number;
    modifySytle?: boolean;
    isVRB?: boolean;
    keyValues?: number[];
    VRBCnt?: number;
    vrtRockButtons?: VrtRockButton[];
}

interface VrtRockButton {
    off: number;
    on: number;
}

interface Knx2 {
    isIPR?: boolean;
    chCnt?: number;
    maxCh?: number;
}

interface Rs485 {
    chCnt?: number;
    maxCh?: number;
    mdbConf: MdbConf;
    multiTopo?: boolean;
    phyConf: PhyConf;
}

interface MdbConf {
    RTU: boolean;
    broadcast?: boolean;
    master: boolean;
    std: boolean;
}

interface PhyConf {
    bRate: number;
    dBit: number;
    ptyBit: number;
    sBit: number;
}

export {};
